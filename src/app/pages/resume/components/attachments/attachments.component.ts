import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AttachmentService } from '@app/core/controllers/attachment.controller';
import { Attachment } from '@app/core/models/attachment.interface';
import { AppDialogService } from '@app/core/services/app-dialog.service';
import { ToastService } from '@app/core/services/toast.service';
import { ConfirmationService } from 'primeng/api';
import { AttachmentFormComponent } from '../attachment-form/attachment-form.component';

@Component({
  selector: 'app-attachments',
  templateUrl: './attachments.component.html',
  styleUrls: ['./attachments.component.scss'],
})
export class AttachmentsComponent implements OnInit {
  editModeOn: boolean = false;

  files: Attachment[] = [];

  constructor(
    private attachementSvc: AttachmentService,
    private dialogSvc: AppDialogService,
    private confirmationService: ConfirmationService,
    private toastSvc: ToastService
  ) {}

  ngOnInit(): void {
    this.attachementSvc.get().subscribe((data: Attachment[]) => {
      this.files = data;
    });
  }

  onSaveClick() {}

  onAddClick() {
    this.dialogSvc.show({
      component: AttachmentFormComponent,
      params: {
        header: 'Add Attachment',
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

  onEditClick(item: Attachment) {
    this.dialogSvc.show({
      component: AttachmentFormComponent,
      data: { item: item },
      params: {
        header: 'Edit Attachment',
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

  onDeleteClick(item: Attachment) {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete ${item.name}?`,
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.attachementSvc.delete(item.id).subscribe(
          (res) => {
            this.toastSvc.add({
              severity: 'success',
              summary: 'Success',
              detail: `${item.name} has been deleted`,
            });
            window.location.reload();
          },
          (err) => {
            this.toastSvc.add({
              severity: 'error',
              summary: 'Error',
              detail: `Unable to delete ${item.name}`,
            });
          }
        );
      },
      reject: () => {},
    });
  }
}
