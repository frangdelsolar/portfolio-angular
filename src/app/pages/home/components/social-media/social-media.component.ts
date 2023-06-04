import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

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

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      github: this.githubControl,
      linkedin: this.linkedinControl,
    });
  }

  onSaveClick() {}
}
