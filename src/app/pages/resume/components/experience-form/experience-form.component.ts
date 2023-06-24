import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ExperienceService } from '@app/core/controllers/experience.controller';
import { AppDialogService } from '@app/core/services/app-dialog.service';
import { ToastService } from '@app/core/services/toast.service';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-experience-form',
  templateUrl: './experience-form.component.html',
  styleUrls: ['./experience-form.component.scss'],
})
export class ExperienceFormComponent implements OnInit {
  @Input() item: any;
  @Input() editModeOn: boolean = true;

  form: FormGroup;
  titleControl: FormControl = new FormControl('', [Validators.required]);
  companyControl: FormControl = new FormControl('', [Validators.required]);
  descriptionControl: FormControl = new FormControl('', [Validators.required]);
  startDateControl: FormControl = new FormControl('', [Validators.required]);
  endDateControl: FormControl = new FormControl('', []);
  cityControl: FormControl = new FormControl('', [Validators.required]);
  countryControl: FormControl = new FormControl('', [Validators.required]);
  categoryControl: FormControl = new FormControl('', [Validators.required]);
  tagsControl: FormControl = new FormControl('', [Validators.required]);

  constructor(
    private fb: FormBuilder,
    private experienceSvc: ExperienceService,
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
      title: this.titleControl,
      company: this.companyControl,
      description: this.descriptionControl,
      start_date: this.startDateControl,
      end_date: this.endDateControl,
      city: this.cityControl,
      country: this.countryControl,
      category: this.categoryControl,
      tags: this.tagsControl,
    });

    if (this.item) {
      this.form.patchValue(this.item);
      this.tagsControl.setValue(this.item.tags.map((t: any) => t.name));
      const startDate = new Date(this.item.start_date);
      this.startDateControl.setValue(startDate);
      if (this.item.end_date) {
        const endDate = new Date(this.item.end_date);
        this.endDateControl.setValue(endDate);
      }
    }
  }

  onSaveClick() {
    // if (this.form.valid) {
    this.experienceSvc.create(this.form.value).subscribe(
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
    // }
  }

  onUpdateClick() {
    // if (this.form.valid) {
    this.experienceSvc.update(this.item.id, this.form.value).subscribe(
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
    // }
  }
}
