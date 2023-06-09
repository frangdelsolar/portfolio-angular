import { Component, Input, OnInit } from '@angular/core';
import { Post } from '@app/core/models/post.interface';

@Component({
  selector: 'app-post-preview',
  templateUrl: './post-preview.component.html',
  styleUrls: ['./post-preview.component.scss'],
})
export class PostPreviewComponent implements OnInit {
  @Input() item: Post;

  constructor() {}

  ngOnInit(): void {}
}
