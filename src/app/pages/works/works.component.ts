import { Component, Input, OnInit } from '@angular/core';
import { AppDialogService } from '@app/core/services/app-dialog.service';
import { WorkItemComponent } from './components/work-item/work-item.component';

@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.scss'],
})
export class WorksComponent implements OnInit {
  constructor(private dialogSvc: AppDialogService) {}

  ngOnInit(): void {}

  onAddClick() {
    this.dialogSvc.show({
      component: WorkItemComponent,
      data: {
        editModeOn: true,
        addNewOn: true,
        item: {
          image: {},
          category: {
            name: '',
            icon: '',
            color: '',
            description: '',
          },
          tags: [],
          title: '',
          project: '',
          client: '',
          start_date: '',
          content: '',
          preview: '',
          date_posted: '',
        },
      },
      params: {
        header: 'Add Project',
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
}
