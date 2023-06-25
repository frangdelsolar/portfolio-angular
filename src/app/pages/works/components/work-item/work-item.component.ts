import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { WorkService } from '@app/core/controllers/work.controller';
import { Work } from '@app/core/models/work.interface';
import { AppDialogService } from '@app/core/services/app-dialog.service';
import { ToastService } from '@app/core/services/toast.service';
import { ConfirmationService } from 'primeng/api';
import { Image } from '@app/core/models/image.interface';

@Component({
  selector: 'app-work-item',
  templateUrl: './work-item.component.html',
  styleUrls: ['./work-item.component.scss'],
})
export class WorkItemComponent implements OnInit {
  @Input() item: Work;

  editModeOn: boolean = false;
  addNewOn: boolean = false;

  placeholder: Image = {
    description: 'Placeholder',
    image_url: 'assets/placeholder-main.png',
  };

  form: FormGroup;
  clientControl = new FormControl('', [Validators.required]);
  contentControl = new FormControl('', [Validators.required]);
  previewControl = new FormControl('', [Validators.required]);
  projectControl = new FormControl('', [Validators.required]);
  repositoryControl = new FormControl('', []);
  startDateControl = new FormControl('', [Validators.required]);
  technologiesControl = new FormControl('', []);
  titleControl = new FormControl('', [Validators.required]);
  urlControl = new FormControl('', []);
  imageControl = new FormControl(this.placeholder, [Validators.required]);
  categoryControl = new FormControl('', [Validators.required]);

  constructor(
    private dialogSvc: AppDialogService,
    private fb: FormBuilder,
    private workSvc: WorkService,
    private toastSvc: ToastService,
    private confirmationSvc: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      client: this.clientControl,
      content: this.contentControl,
      preview: this.previewControl,
      project: this.projectControl,
      repository: this.repositoryControl,
      start_date: this.startDateControl,
      technologies: this.technologiesControl,
      title: this.titleControl,
      url: this.urlControl,
      image: this.imageControl,
      category: this.categoryControl,
    });

    this.dialogSvc.DialogDataObservable.subscribe((res) => {
      const data = res.data;
      if ('item' in data) {
        this.item = data.item;
        this.form.patchValue(this.item);
      }
      if ('editModeOn' in data) {
        this.editModeOn = data.editModeOn;
      }
      if ('addNewOn' in data) {
        this.addNewOn = data.addNewOn;
      }
    });
  }

  onSaveClick() {
    if (this.addNewOn) {
      this.workSvc.create(this.form.value).subscribe(
        (res) => {
          this.toastSvc.add({
            severity: 'success',
            summary: 'Success',
            detail: `${this.form.value.title} has been created`,
          });
          window.location.reload();
        },
        (err) => {
          if ('detail' in err.error) {
            this.toastSvc.add({
              severity: 'error',
              summary: 'Error',
              detail: err.error.detail,
            });
          }
          if ('errors' in err.error) {
            err.error.errors.forEach((element: any) => {
              const fieldName = element.field;
              this.form.controls[fieldName].setErrors({
                serverError: element.message,
              });
              this.form.controls[fieldName].markAsDirty();
            });
          }
        }
      );
    } else {
      this.workSvc.update(this.item.id, this.form.value).subscribe(
        (res) => {
          this.toastSvc.add({
            severity: 'success',
            summary: 'Success',
            detail: `${this.form.value.title} has been updated`,
          });
          window.location.reload();
        },
        (err) => {
          if ('detail' in err.error) {
            this.toastSvc.add({
              severity: 'error',
              summary: 'Error',
              detail: err.error.detail,
            });
          }
          if ('errors' in err.error) {
            err.error.errors.forEach((element: any) => {
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

  onDeleteClick() {
    this.confirmationSvc.confirm({
      message: `Are you sure you want to delete ${this.item.title}?`,
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.workSvc.delete(this.item.id).subscribe(
          (res) => {
            this.toastSvc.add({
              severity: 'success',
              summary: 'Success',
              detail: `${this.item.title} has been deleted`,
            });
            window.location.reload();
          },
          (err) => {
            this.toastSvc.add({
              severity: 'error',
              summary: 'Error',
              detail: `Unable to delete ${this.item.title}`,
            });
          }
        );
      },
      reject: () => {},
    });
  }
}
