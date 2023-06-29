import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AttachmentService } from '@app/core/controllers/attachment.controller';
import { AppDialogService } from '@app/core/services/app-dialog.service';
import { ToastService } from '@app/core/services/toast.service';

@Component({
  selector: 'app-attachment-form',
  templateUrl: './attachment-form.component.html',
  styleUrls: ['./attachment-form.component.scss'],
})
export class AttachmentFormComponent implements OnInit {
  @Input() item: any;
  @Input() editModeOn: boolean = true;

  formData: FormData = new FormData();
  form: FormGroup;
  nameControl: FormControl = new FormControl('', [Validators.required]);
  descriptionControl: FormControl = new FormControl('', [Validators.required]);
  fileControl: FormControl = new FormControl('N/A', [Validators.required]);

  constructor(
    private fb: FormBuilder,
    private attachmentSvc: AttachmentService,
    private dialogSvc: AppDialogService,
    private toastSvc: ToastService
  ) {
    this.dialogSvc.DialogDataObservable.subscribe((data) => {
      if (data) {
        this.item = data.data.item;
      }
    });
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: this.nameControl,
      description: this.descriptionControl,
      file: this.fileControl,
    });

    if (this.item) {
      this.form.patchValue(this.item);
      this.fileControl.setValue({
        name: this.item.file_name,
        size: this.item.file_size,
      });
    }
  }

  uploadHandler(event: any) {
    this.formData = new FormData();
    this.formData.append('file', event.files[0]);
    this.fileControl.setValue(event.files[0]);
  }

  onSaveClick() {
    this.formData.append('name', this.form.value.name);
    this.formData.append('description', this.form.value.description);
    this.attachmentSvc.create(this.formData).subscribe(
      (response: any) => {
        if (response) {
          this.form.patchValue(response);
          this.dialogSvc.close();
        }
      },
      (error) => {
        if ('detail' in error.error) {
          this.toastSvc.add({
            severity: 'error',
            summary: 'Error',
            detail: error.error.detail,
          });
        }
        if ('errors' in error.error) {
          error.error.errors.forEach((element: any) => {
            const fieldName = element.field;
            this.form.controls[fieldName].setErrors({
              serverError: element.message,
            });
            this.form.controls[fieldName].markAsDirty();
          });
        }
      }
    );
  }

  onUpdateClick() {
    this.formData.append('name', this.form.value.name);
    this.formData.append('description', this.form.value.description);
    this.attachmentSvc.update(this.item.id, this.formData).subscribe(
      (response: any) => {
        if (response) {
          this.form.patchValue(response);
          this.dialogSvc.close();
        }
      },
      (error) => {
        if ('detail' in error.error) {
          this.toastSvc.add({
            severity: 'error',
            summary: 'Error',
            detail: error.error.detail,
          });
        }
        if ('errors' in error.error) {
          error.error.errors.forEach((element: any) => {
            const fieldName = element.field;
            this.form.controls[fieldName].setErrors({
              serverError: element.message,
            });
            this.form.controls[fieldName].markAsDirty();
          });
        }
      }
    );
  }
}
