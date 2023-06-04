import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { markAllAsDirty } from '@core/utils/markFieldsAsDirty';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
 
  form!: FormGroup;
  email = new FormControl('', [Validators.required]);
  first_name = new FormControl('', [Validators.required]);
  last_name = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  password_confirmation = new FormControl('', [Validators.required]);
  
  markAllAsDirty = markAllAsDirty;

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private messageService: MessageService,
    private authSvc: AuthService,
  ) {
    this.form = fb.group({
      email: this.email,
      first_name: this.first_name,
      last_name: this.last_name,
      password: this.password,
      password_confirmation: this.password_confirmation,
    })
   }

  ngOnInit(): void {
  }

  validateForm(){
    let valid = true;
    if (!this.form.valid){
      this.markAllAsDirty(this.form);
      this.messageService.add({severity:'error', summary:'Algo anda mal', detail: 'Parece que falta completar algo.'});
      valid = false
    }

    if (this.form.controls['password'].value != this.form.controls['password_confirmation'].value){
      this.messageService.add({severity:'error', summary:'Algo anda mal', detail: 'Las contraseñas no coinciden.'});
      this.form.controls['email'].markAsDirty();
      this.form.controls['email_confirmation'].markAsDirty();
      if (valid){
        valid = false;
      }
    }

    return valid;
  }

  onRegister(){
      if (this.validateForm()){
        this.authSvc.registerFirebase(this.form.value).then((userCredential) => {
          this.messageService.add({severity:'success', summary:'Operación exitosa', detail:'Usuario registrado.'});
          this.authSvc.updateUser(this.form.value);
          let data = {
            username: this.email.value,
            ...this.form.value,
          }
          this.authSvc.register(data).subscribe(
            (res)=>{
              this.authSvc.login(userCredential.user);
              window.location.href="/";
            }, 
            (err)=>{
              this.messageService.add({severity:'error', summary:'Algo anda mal', detail: err.message});
            }
          )
        })
        .catch((error) => {
          this.messageService.add({severity:'error', summary:'Algo anda mal', detail: error.message});
        });
      } 
  }



}
