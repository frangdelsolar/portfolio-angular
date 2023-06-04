import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './auth/login/login.component';
import { PersonalDetailsComponent } from './home/components/personal-details/personal-details.component';
import { SocialMediaComponent } from './home/components/social-media/social-media.component';

@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    PersonalDetailsComponent,
    SocialMediaComponent,
  ],
  imports: [CommonModule, SharedModule],
})
export class PagesModule {}
