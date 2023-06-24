import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EducationService } from '@app/core/controllers/education.controller';
import { AppDialogService } from '@app/core/services/app-dialog.service';
import { ToastService } from '@app/core/services/toast.service';
import { ConfirmationService } from 'primeng/api';
import { EducationFormComponent } from '../education-form/education-form.component';

@Component({
  selector: 'app-education-item',
  templateUrl: './education-item.component.html',
  styleUrls: ['./education-item.component.scss'],
})
export class EducationItemComponent implements OnInit {
  @Input() editModeOn: boolean = true;
  @Input() item: any;

  constructor(
    private dialogSvc: AppDialogService,
    private confirmationService: ConfirmationService,
    private educationSvc: EducationService,
    private toastSvc: ToastService
  ) {}

  ngOnInit(): void {}

  get dates(): string {
    const startYear = new Date(this.item.start_date).getFullYear();
    if (!this.item.end_date) {
      return `${startYear} to Present`;
    }
    const endYear = new Date(this.item.end_date).getFullYear();
    return `${startYear} to ${endYear}`;
  }

  get tagControl() {
    const tags = this.item.tags.map((tag: any) => tag.name);

    return new FormControl(tags, []);
  }

  onEditClick() {
    this.dialogSvc.show({
      component: EducationFormComponent,
      data: { item: this.item },
      params: {
        header: 'Edit Academic Background',
        width: '50%',
        contentStyle: { overflow: 'auto' },
        baseZIndex: 10000,
        maximizable: true,
      },
    });
    this.dialogSvc.DialogShowObservable.subscribe((res) => {
      if (res === false) {
        window.location.reload();
      }
    });
  }

  onDeleteClick() {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete ${this.item.qualification}?`,
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.educationSvc.delete(this.item.id).subscribe(
          (res) => {
            this.toastSvc.add({
              severity: 'success',
              summary: 'Success',
              detail: `${this.item.qualification} has been deleted`,
            });
            window.location.reload();
          },
          (err) => {
            this.toastSvc.add({
              severity: 'error',
              summary: 'Error',
              detail: `Unable to delete ${this.item.qualification}`,
            });
          }
        );
      },
      reject: () => {},
    });
  }
}
