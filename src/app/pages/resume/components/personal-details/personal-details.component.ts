import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Image } from '@app/core/models/image.interface';
import { PersonalService } from '@app/core/controllers/personal.controller';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss'],
})
export class PersonalDetailsComponent implements OnInit {
  title: string = 'Personal Details';
  image: Image = {
    description: 'Placeholder',
    image_url: 'assets/placeholder-profile.jpeg',
  };

  editModeOn: boolean = false;

  form: FormGroup;
  firstNameControl = new FormControl('', [Validators.required]);
  lastNameControl = new FormControl('', [Validators.required]);
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  phoneControl = new FormControl('', [Validators.required]);
  cityControl = new FormControl('', [Validators.required]);
  countryControl = new FormControl('', [Validators.required]);
  imageControl = new FormControl(this.image, [Validators.required]);

  constructor(private fb: FormBuilder, private personalSvc: PersonalService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      first_name: this.firstNameControl,
      last_name: this.lastNameControl,
      email: this.emailControl,
      phone: this.phoneControl,
      city: this.cityControl,
      country: this.countryControl,
      profile_picture: this.imageControl,
    });
    this.personalSvc.get().subscribe((response: any) => {
      if (response) {
        this.form.patchValue(response);
        this.image = response.profile_picture;
      }
    });
  }

  onSaveClick() {
    if (this.form.valid) {
      this.personalSvc.update(this.form.value).subscribe((response: any) => {
        if (response) {
          this.form.patchValue(response);
          this.editModeOn = false;
        }
      });
    }
  }
}
