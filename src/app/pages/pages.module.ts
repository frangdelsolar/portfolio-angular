import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { AboutComponent } from './home/components/about/about.component';
import { AttachmentsComponent } from './home/components/attachments/attachments.component';
import { BlogComponent } from './blog/blog.component';
import { ContactComponent } from './home/components/contact/contact.component';
import { EducationComponent } from './home/components/education/education.component';
import { EducationItemComponent } from './home/components/education-item/education-item.component';
import { ExperienceComponent } from './home/components/experience/experience.component';
import { ExperienceItemComponent } from './home/components/experience-item/experience-item.component';
import { HomeComponent } from './home/home.component';
import { LoginFormComponent } from './auth/components/login-form/login-form.component';
import { PasswordResetComponent } from './auth/components/password-reset/password-reset.component';
import { PersonalDetailsComponent } from './home/components/personal-details/personal-details.component';
import { PostItemComponent } from './blog/components/post-item/post-item.component';
import { PostListComponent } from './blog/components/post-list/post-list.component';
import { PostPreviewComponent } from './blog/components/post-preview/post-preview.component';
import { SocialMediaComponent } from './home/components/social-media/social-media.component';
import { SkillsComponent } from './home/components/skills/skills.component';
import { SkillItemComponent } from './home/components/skill-item/skill-item.component';
import { WorksComponent } from './works/works.component';
import { WorkListComponent } from './works/components/work-list/work-list.component';
import { WorkItemComponent } from './works/components/work-item/work-item.component';
import { WorkPreviewComponent } from './works/components/work-preview/work-preview.component';

@NgModule({
  declarations: [
    AboutComponent,
    AttachmentsComponent,
    BlogComponent,
    ContactComponent,
    EducationComponent,
    EducationItemComponent,
    ExperienceComponent,
    ExperienceItemComponent,
    HomeComponent,
    LoginFormComponent,
    PasswordResetComponent,
    PersonalDetailsComponent,
    PostItemComponent,
    PostListComponent,
    PostPreviewComponent,
    SocialMediaComponent,
    SkillsComponent,
    SkillItemComponent,
    WorksComponent,
    WorkListComponent,
    WorkItemComponent,
    WorkPreviewComponent,
  ],
  imports: [CommonModule, SharedModule],
})
export class PagesModule {}
