import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SocialService } from '@app/core/controllers/social.controller';

@Component({
  selector: 'app-social-media',
  templateUrl: './social-media.component.html',
  styleUrls: ['./social-media.component.scss'],
})
export class SocialMediaComponent implements OnInit {
  editModeOn: boolean = false;

  form: FormGroup;
  githubControl = new FormControl('', [Validators.required]);
  linkedinControl = new FormControl('', [Validators.required]);

  constructor(private fb: FormBuilder, private socialSvc: SocialService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      github: this.githubControl,
      linkedin: this.linkedinControl,
    });
    this.socialSvc.get().subscribe((data: any) => {
      if (data) {
        this.githubControl.setValue(data.github);
        this.linkedinControl.setValue(data.linkedin);
      }
    });
  }

  onSaveClick() {
    if (this.form.valid) {
      this.socialSvc.update(this.form.value).subscribe((response: any) => {
        if (response) {
          this.form.patchValue(response);
          this.editModeOn = false;
        }
      });
    }
  }
}
