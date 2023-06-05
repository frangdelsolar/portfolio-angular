import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AboutService } from '@app/core/controllers/about.controller';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  editModeOn: boolean = false;

  form: FormGroup;
  aboutHtmlControl: FormControl = new FormControl('', []);

  constructor(private fb: FormBuilder, private aboutSvc: AboutService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      about: this.aboutHtmlControl,
    });
    this.aboutSvc.get().subscribe((res: any) => {
      this.aboutHtmlControl.setValue(res.content);
    });
  }

  onSaveClick() {
    if (this.form.valid) {
      console.log(this.form.value);
      this.aboutSvc.update(this.form.value).subscribe((response: any) => {
        if (response) {
          this.form.patchValue(response);
          this.editModeOn = false;
        }
      });
    }
  }
}
