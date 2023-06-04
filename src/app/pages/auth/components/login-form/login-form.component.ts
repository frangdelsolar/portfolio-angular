import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '@core/services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  form!: FormGroup;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private authSvc: AuthService
  ) {
    this.form = fb.group({
      email: this.email,
      password: this.password,
    });
  }

  ngOnInit(): void {}

  onLogin() {
    if (this.form.valid) {
      this.authSvc.auth(this.form.value)?.then(
        (googleAuth: any) => {
          this.authSvc.login(googleAuth.user);
        },
        (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Algo anda mal',
            detail: err.message,
          });
        }
      );
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Algo anda mal',
        detail: 'Parece que falta completar algo.',
      });
    }
  }
}
