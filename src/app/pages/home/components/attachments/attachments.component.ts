import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AttachmentService } from '@app/core/controllers/attachment.controller';
import { Attachment } from '@app/core/models/attachment.interface';

@Component({
  selector: 'app-attachments',
  templateUrl: './attachments.component.html',
  styleUrls: ['./attachments.component.scss'],
})
export class AttachmentsComponent implements OnInit {
  files: Attachment[] = [];

  constructor(
    private fb: FormBuilder,
    private attachementSvc: AttachmentService
  ) {}

  ngOnInit(): void {
    this.attachementSvc.get().subscribe((data: Attachment[]) => {
      this.files = data;
    });
  }
}
