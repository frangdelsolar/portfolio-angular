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
    alt: 'Placeholder',
    url: 'https://st4.depositphotos.com/9998432/22597/v/450/depositphotos_225976914-stock-illustration-person-gray-photo-placeholder-man.jpg',
  };

  isAuth: boolean = true;
  editModeOn: boolean = false;

  form: FormGroup;
  firstNameControl = new FormControl('', [Validators.required]);
  lastNameControl = new FormControl('', [Validators.required]);
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  phoneControl = new FormControl('', [Validators.required]);
  cityControl = new FormControl('', [Validators.required]);
  countryControl = new FormControl('', [Validators.required]);

  constructor(private fb: FormBuilder, private personalSvc: PersonalService) {
    this.form = fb.group({
      first_name: this.firstNameControl,
      last_name: this.lastNameControl,
      email: this.emailControl,
      phone: this.phoneControl,
      city: this.cityControl,
      country: this.countryControl,
    });
  }

  ngOnInit(): void {
    this.personalSvc.get().subscribe((response: any) => {
      if (response) {
        this.form.patchValue(response);
        this.image = {
          alt: response.profile_picture.name,
          url: response.profile_picture.image_url,
        };
        console.log(response);
      }
    });
  }

  onEditClick() {
    if (this.isAuth) {
      this.editModeOn = true;
    }
  }

  onCancelClick() {
    this.editModeOn = false;
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

    // onError
    // show inline errors
  }
}
