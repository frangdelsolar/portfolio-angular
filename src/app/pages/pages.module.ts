import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { AttachmentsComponent } from './home/components/attachments/attachments.component';
import { HomeComponent } from './home/home.component';
import { PersonalDetailsComponent } from './home/components/personal-details/personal-details.component';
import { SocialMediaComponent } from './home/components/social-media/social-media.component';
import { LoginFormComponent } from './auth/components/login-form/login-form.component';
import { PasswordResetComponent } from './auth/components/password-reset/password-reset.component';

@NgModule({
  declarations: [
    AttachmentsComponent,
    HomeComponent,
    LoginFormComponent,
    PasswordResetComponent,
    PersonalDetailsComponent,
    SocialMediaComponent,
  ],
  imports: [CommonModule, SharedModule],
})
export class PagesModule {}
