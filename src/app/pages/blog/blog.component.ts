import { Component, OnInit } from '@angular/core';
import { AppDialogService } from '@app/core/services/app-dialog.service';
import { PostItemComponent } from './components/post-item/post-item.component';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  constructor(private dialogSvc: AppDialogService) {}

  ngOnInit(): void {}

  onAddClick() {
    this.dialogSvc.show({
      component: PostItemComponent,
      data: {
        editModeOn: true,
        addNewOn: true,
        item: {
          title: '',
          preview: '',
          image: {},
          content: '',
          date_posted: '',

          category: {
            name: '',
            icon: '',
            color: '',
            description: '',
          },
          tags: [],
        },
      },
      params: {
        header: 'Add Post',
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
