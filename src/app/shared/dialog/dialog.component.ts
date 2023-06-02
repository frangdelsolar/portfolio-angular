import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '@app/pages/home/home.component';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AppDialogService } from '@app/core/services/app-dialog.service';
import { DialogData } from '@app/core/models/dialog.interface';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  providers: [DialogService, MessageService],
})
export class DialogComponent implements OnInit {
  dialogData: DialogData;

  constructor(
    public appDialogSvc: AppDialogService,
    public dialogService: DialogService,
    public messageService: MessageService
  ) {}

  ref: DynamicDialogRef;

  ngOnInit() {
    this.appDialogSvc.DialogShowObservable.subscribe((showModal) => {
      if (showModal) {
        this.show();
      }
    });

    this.appDialogSvc.DialogDataObservable.subscribe((data) => {
      this.dialogData = data;
    });
  }

  show() {
    this.ref = this.dialogService.open(
      this.dialogData.component,
      this.dialogData.params
    );
  }
}
