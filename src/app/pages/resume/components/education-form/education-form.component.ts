import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { EducationService } from '@app/core/controllers/education.controller';
import { AppDialogService } from '@app/core/services/app-dialog.service';
import { ToastService } from '@app/core/services/toast.service';

@Component({
  selector: 'app-education-form',
  templateUrl: './education-form.component.html',
  styleUrls: ['./education-form.component.scss'],
})
export class EducationFormComponent implements OnInit {
  @Input() item: any;
  @Input() editModeOn: boolean = true;

  form: FormGroup;
  qualificationControl: FormControl = new FormControl('', [
    Validators.required,
  ]);
  institutionControl: FormControl = new FormControl('', [Validators.required]);
  detailsControl: FormControl = new FormControl('', [Validators.required]);
  startDateControl: FormControl = new FormControl('', [Validators.required]);
  endDateControl: FormControl = new FormControl('', []);
  cityControl: FormControl = new FormControl('', [Validators.required]);
  countryControl: FormControl = new FormControl('', [Validators.required]);
  categoryControl: FormControl = new FormControl('', [Validators.required]);
  tagsControl: FormControl = new FormControl('', [Validators.required]);

  constructor(
    private fb: FormBuilder,
    private educationSvc: EducationService,
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
      qualification: this.qualificationControl,
      institution: this.institutionControl,
      details: this.detailsControl,
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
    this.educationSvc.create(this.form.value).subscribe(
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
    this.educationSvc.update(this.item.id, this.form.value).subscribe(
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
