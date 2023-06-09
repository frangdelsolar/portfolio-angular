import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { PostService } from '@app/core/controllers/post.controller';
import { Post } from '@app/core/models/post.interface';
import { AppDialogService } from '@app/core/services/app-dialog.service';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss'],
})
export class PostItemComponent implements OnInit {
  @Input() item: Post;

  editModeOn: boolean = false;

  form: FormGroup;
  contentControl = new FormControl('', [Validators.required]);
  previewControl = new FormControl('', [Validators.required]);
  titleControl = new FormControl('', [Validators.required]);

  constructor(
    private dialogSvc: AppDialogService,
    private fb: FormBuilder,
    private postSvc: PostService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      content: this.contentControl,
      preview: this.previewControl,
      title: this.titleControl,
    });

    this.dialogSvc.DialogDataObservable.subscribe((res) => {
      this.item = res.data;
      this.form.patchValue(this.item);
    });
  }

  onSaveClick() {
    if (this.form.valid) {
      this.postSvc.update(this.item.id, this.form.value).subscribe((res) => {
        console.log(res);
      });
    }
  }
}
