import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { AboutComponent } from './resume/components/about/about.component';
import { AttachmentFormComponent } from './resume/components/attachment-form/attachment-form.component';
import { AttachmentsComponent } from './resume/components/attachments/attachments.component';
import { BlogComponent } from './blog/blog.component';
import { CategoryFormComponent } from './resume/components/category-form/category-form.component';
import { ContactComponent } from './resume/components/contact/contact.component';
import { EducationComponent } from './resume/components/education/education.component';
import { EducationFormComponent } from './resume/components/education-form/education-form.component';
import { EducationItemComponent } from './resume/components/education-item/education-item.component';
import { ExperienceComponent } from './resume/components/experience/experience.component';
import { ExperienceItemComponent } from './resume/components/experience-item/experience-item.component';
import { HomeComponent } from './home/home.component';
import { LoginFormComponent } from './auth/components/login-form/login-form.component';
import { PasswordResetComponent } from './auth/components/password-reset/password-reset.component';
import { PersonalDetailsComponent } from './resume/components/personal-details/personal-details.component';
import { PostItemComponent } from './blog/components/post-item/post-item.component';
import { PostListComponent } from './blog/components/post-list/post-list.component';
import { PostPreviewComponent } from './blog/components/post-preview/post-preview.component';
import { ResumeComponent } from './resume/resume.component';
import { SocialMediaComponent } from './resume/components/social-media/social-media.component';
import { SkillsComponent } from './resume/components/skills/skills.component';
import { SkillItemComponent } from './resume/components/skill-item/skill-item.component';
import { WorksComponent } from './works/works.component';
import { WorkListComponent } from './works/components/work-list/work-list.component';
import { WorkItemComponent } from './works/components/work-item/work-item.component';
import { WorkPreviewComponent } from './works/components/work-preview/work-preview.component';
import { PasswordNewComponent } from './auth/components/password-new/password-new.component';
import { ExperienceFormComponent } from './resume/components/experience-form/experience-form.component';
import { CategoryDropdownComponent } from './resume/components/category-dropdown/category-dropdown.component';
import { TagsSelectorComponent } from './resume/components/tags-selector/tags-selector.component';

@NgModule({
  declarations: [
    AboutComponent,
    AttachmentFormComponent,
    AttachmentsComponent,
    BlogComponent,
    CategoryDropdownComponent,
    CategoryFormComponent,
    ContactComponent,
    EducationComponent,
    EducationFormComponent,
    EducationItemComponent,
    ExperienceComponent,
    ExperienceFormComponent,
    ExperienceItemComponent,
    HomeComponent,
    LoginFormComponent,
    PasswordNewComponent,
    PasswordResetComponent,
    PersonalDetailsComponent,
    PostItemComponent,
    PostListComponent,
    PostPreviewComponent,
    ResumeComponent,
    SocialMediaComponent,
    SkillsComponent,
    SkillItemComponent,
    WorksComponent,
    WorkListComponent,
    WorkItemComponent,
    WorkPreviewComponent,
    TagsSelectorComponent,
  ],
  imports: [CommonModule, SharedModule],
})
export class PagesModule {}
