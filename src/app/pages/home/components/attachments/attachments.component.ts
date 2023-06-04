import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AttachmentService } from '@app/core/controllers/attachment.controller';

@Component({
  selector: 'app-attachments',
  templateUrl: './attachments.component.html',
  styleUrls: ['./attachments.component.scss'],
})
export class AttachmentsComponent implements OnInit {
  editModeOn: boolean = false;

  form: FormGroup;
  githubControl = new FormControl('', [Validators.required]);
  linkedinControl = new FormControl('', [Validators.required]);

  constructor(
    private fb: FormBuilder,
    private attachementSvc: AttachmentService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      github: this.githubControl,
      linkedin: this.linkedinControl,
    });

    this.attachementSvc.get().subscribe((data: any) => {
      this.form.patchValue(data);
    });
  }

  onSaveClick() {
    if (this.form.valid) {
      this.attachementSvc.update(this.form.value).subscribe((response: any) => {
        if (response) {
          this.form.patchValue(response);
          this.editModeOn = false;
        }
      });
    }
  }
}
