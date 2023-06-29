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
import { ToastService } from '@app/core/services/toast.service';
import { ConfirmationService } from 'primeng/api';
import { Image } from '@app/core/models/image.interface';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss'],
})
export class PostItemComponent implements OnInit {
  @Input() item: Post;

  editModeOn: boolean = false;
  addNewOn: boolean = false;

  placeholder: Image = {
    description: 'Placeholder',
    image_url: 'assets/placeholder-main.png',
  };

  form: FormGroup;
  contentControl = new FormControl('', [Validators.required]);
  previewControl = new FormControl('', [Validators.required]);
  titleControl = new FormControl('', [Validators.required]);
  tagsControl = new FormControl([''], []);
  imageControl = new FormControl(this.placeholder, [Validators.required]);
  categoryControl = new FormControl('', [Validators.required]);

  constructor(
    private dialogSvc: AppDialogService,
    private fb: FormBuilder,
    private postSvc: PostService,
    private toastSvc: ToastService,
    private confirmationSvc: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      content: this.contentControl,
      preview: this.previewControl,
      tags: this.tagsControl,
      title: this.titleControl,
      image: this.imageControl,
      category: this.categoryControl,
    });

    this.dialogSvc.DialogDataObservable.subscribe((res) => {
      const data = res.data;
      if ('item' in data) {
        this.item = data.item;
        this.form.patchValue(this.item);

        const tagNames: string[] = [];
        data.item.tags.forEach((element: any) => {
          tagNames.push(element.name);
        });
        this.tagsControl.setValue(tagNames);
      }
      if ('editModeOn' in data) {
        this.editModeOn = data.editModeOn;
      }
      if ('addNewOn' in data) {
        this.addNewOn = data.addNewOn;
      }
    });
  }

  onSaveClick() {
    if (this.addNewOn) {
      this.postSvc.create(this.form.value).subscribe(
        (res) => {
          this.toastSvc.add({
            severity: 'success',
            summary: 'Success',
            detail: `${this.form.value.title} has been created`,
          });
          window.location.reload();
        },
        (err) => {
          if ('detail' in err.error) {
            this.toastSvc.add({
              severity: 'error',
              summary: 'Error',
              detail: err.error.detail,
            });
          }
          if ('errors' in err.error) {
            err.error.errors.forEach((element: any) => {
              const fieldName = element.field;
              this.form.controls[fieldName].setErrors({
                serverError: element.message,
              });
              this.form.controls[fieldName].markAsDirty();
            });
          }
        }
      );
    } else {
      this.postSvc.update(this.item.id, this.form.value).subscribe(
        (res) => {
          this.toastSvc.add({
            severity: 'success',
            summary: 'Success',
            detail: `${this.form.value.title} has been updated`,
          });
          window.location.reload();
        },
        (err) => {
          if ('detail' in err.error) {
            this.toastSvc.add({
              severity: 'error',
              summary: 'Error',
              detail: err.error.detail,
            });
          }
          if ('errors' in err.error) {
            err.error.errors.forEach((element: any) => {
              const fieldName = element.field;
              this.form.controls[fieldName].setErrors({
                serverError: element.message,
              });
              this.form.controls[fieldName].markAsDirty();
            });
          }
        }
      );
    }
  }

  onDeleteClick() {
    this.confirmationSvc.confirm({
      message: `Are you sure you want to delete ${this.item.title}?`,
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.postSvc.delete(this.item.id).subscribe(
          (res) => {
            this.toastSvc.add({
              severity: 'success',
              summary: 'Success',
              detail: `${this.item.title} has been deleted`,
            });
            window.location.reload();
          },
          (err) => {
            this.toastSvc.add({
              severity: 'error',
              summary: 'Error',
              detail: `Unable to delete ${this.item.title}`,
            });
          }
        );
      },
      reject: () => {},
    });
  }
}
