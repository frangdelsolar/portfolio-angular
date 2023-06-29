import { Component, OnInit } from '@angular/core';
import { PostService } from '@app/core/controllers/post.controller';
import { Post } from '@app/core/models/post.interface';
import { AppDialogService } from '@app/core/services/app-dialog.service';
import { PostItemComponent } from '../post-item/post-item.component';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {
  items: Post[];
  constructor(
    private postSvc: PostService,
    private dialogSvc: AppDialogService
  ) {}

  ngOnInit(): void {
    this.postSvc.get().subscribe((res: any) => {
      this.items = res;
    });
  }

  open(item: Post) {
    this.dialogSvc.show({
      component: PostItemComponent,
      data: { item },
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
