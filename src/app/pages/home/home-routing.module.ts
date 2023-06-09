import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { ResumeComponent } from '../resume/resume.component';
import { BlogComponent } from '../blog/blog.component';
import { WorksComponent } from '../works/works.component';
import { ContactComponent } from '../resume/components/contact/contact.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'resume',
        pathMatch: 'full',
        component: ResumeComponent,
      },
      {
        path: 'works',
        component: WorksComponent,
      },
      {
        path: 'blog',
        component: BlogComponent,
      },
      {
        path: 'contact',
        component: ContactComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [],
})
export class HomeRoutingModule {}
