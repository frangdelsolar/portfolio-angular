import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WorkService } from '@app/core/controllers/work.controller';
import { Work } from '@app/core/models/work.interface';
import { AppDialogService } from '@app/core/services/app-dialog.service';
import { WorkItemComponent } from '../work-item/work-item.component';

@Component({
  selector: 'app-work-list',
  templateUrl: './work-list.component.html',
  styleUrls: ['./work-list.component.scss'],
})
export class WorkListComponent implements OnInit {
  items: Work[];
  constructor(
    private workSvc: WorkService,
    private dialogSvc: AppDialogService
  ) {}

  ngOnInit(): void {
    this.workSvc.get().subscribe((res: any) => {
      this.items = res;
    });
  }

  open(item: Work) {
    this.dialogSvc.show({
      component: WorkItemComponent,
      data: item,
      params: {
        header: '',
        width: '60%',
        contentStyle: { overflow: 'auto' },
        baseZIndex: 10000,
        maximizable: true,
      },
    });
  }
}
