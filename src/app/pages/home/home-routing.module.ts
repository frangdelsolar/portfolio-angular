import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'resume',
        component: HomeComponent,
      },
      {
        path: 'works',
        component: HomeComponent,
      },
      {
        path: 'blog',
        component: HomeComponent,
      },
      {
        path: 'contact',
        component: HomeComponent,
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
