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
  ) {}

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
            if (element.field === 'title') {
              this.titleControl.setErrors({ serverError: element.message });
              this.titleControl.markAsDirty();
            }
            if (element.field === 'company') {
              this.companyControl.setErrors({ serverError: element.message });
              this.companyControl.markAsDirty();
            }
            if (element.field === 'description') {
              this.descriptionControl.setErrors({
                serverError: element.message,
              });
              this.descriptionControl.markAsDirty();
            }
            if (element.field === 'start_date') {
              this.startDateControl.setErrors({
                serverError: element.message,
              });
              this.startDateControl.markAsDirty();
            }
            if (element.field === 'end_date') {
              this.endDateControl.setErrors({ serverError: element.message });
              this.endDateControl.markAsDirty();
            }
            if (element.field === 'city') {
              this.cityControl.setErrors({ serverError: element.message });
              this.cityControl.markAsDirty();
            }
            if (element.field === 'country') {
              this.countryControl.setErrors({ serverError: element.message });
              this.countryControl.markAsDirty();
            }
            if (element.field === 'category') {
              this.categoryControl.setErrors({ serverError: element.message });
              this.categoryControl.markAsDirty();
            }
            if (element.field === 'tags') {
              this.tagsControl.setErrors({ serverError: element.message });
              this.tagsControl.markAsDirty();
            }
          });
        }
      }
    );
    // }
  }
}
