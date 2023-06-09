import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ContactMeService } from '@app/core/controllers/contact-me.controller';
import { ToastService } from '@app/core/services/toast.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  form: FormGroup;

  controlName: FormControl = new FormControl('', [Validators.required]);
  controlEmail: FormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  controlMsg: FormControl = new FormControl('', [Validators.required]);

  buttonProcessing: boolean = false;

  constructor(
    private fb: FormBuilder,
    private contactMeSvc: ContactMeService,
    private msgSvc: ToastService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: this.controlName,
      email: this.controlEmail,
      message: this.controlMsg,
    });
  }

  onSendForm() {
    this.buttonProcessing = true;
    if (this.form.valid) {
      this.contactMeSvc.send(this.form.value).subscribe((res) => {
        this.msgSvc.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Message sent successfully',
        });
        this.form.reset();
        this.buttonProcessing = false;
      });
    }
  }
}
