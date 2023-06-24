import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ExperienceService } from '@app/core/controllers/experience.controller';
import { AppDialogService } from '@app/core/services/app-dialog.service';
import { ToastService } from '@app/core/services/toast.service';
import { ConfirmationService } from 'primeng/api';
import { ExperienceFormComponent } from '../experience-form/experience-form.component';

@Component({
  selector: 'app-experience-item',
  templateUrl: './experience-item.component.html',
  styleUrls: ['./experience-item.component.scss'],
})
export class ExperienceItemComponent implements OnInit {
  @Input() editModeOn: boolean = true;
  @Input() experience: any;

  constructor(
    private dialogSvc: AppDialogService,
    private confirmationService: ConfirmationService,
    private experienceSvc: ExperienceService,
    private toastSvc: ToastService
  ) {}

  ngOnInit(): void {}

  get dates(): string {
    const startYear = new Date(this.experience.start_date).getFullYear();
    if (!this.experience.end_date) {
      return `${startYear} to Present`;
    }
    const endYear = new Date(this.experience.end_date).getFullYear();
    return `${startYear} to ${endYear}`;
  }

  getIcon(icon: string): any {
    if (!icon) {
      return null;
    }
    icon = `pi ${icon.replace('fa', 'pi')}`;
    return icon;
  }

  get tagControl() {
    const tags = this.experience.tags.map((tag: any) => tag.name);

    return new FormControl(tags, []);
  }

  onEditClick() {
    this.dialogSvc.show({
      component: ExperienceFormComponent,
      data: { item: this.experience },
      params: {
        header: 'Edit Work Experience',
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
      message: `Are you sure you want to delete ${this.experience.title}?`,
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.experienceSvc.delete(this.experience.id).subscribe(
          (res) => {
            this.toastSvc.add({
              severity: 'success',
              summary: 'Success',
              detail: `${this.experience.title} has been deleted`,
            });
            window.location.reload();
          },
          (err) => {
            this.toastSvc.add({
              severity: 'error',
              summary: 'Error',
              detail: `Unable to delete ${this.experience.title}`,
            });
          }
        );
      },
      reject: () => {},
    });
  }
}
