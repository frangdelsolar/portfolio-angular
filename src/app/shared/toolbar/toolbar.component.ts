import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  items: MenuItem[] = [
    {
      label: 'Resume',
      icon: 'pi pi-fw pi-file',
      routerLink: '/resume',
    },
    {
      label: 'Works',
      icon: 'pi pi-fw pi-briefcase',
      routerLink: '/works',
    },
    {
      label: 'Blog',
      icon: 'pi pi-fw pi-book',
      routerLink: '/blog',
    },
    {
      label: 'Contact',
      icon: 'pi pi-fw pi-envelope',
      routerLink: '/contact',
    },
    {
      label: 'Login',
      icon: 'pi pi-fw pi-sign-in',
      command: () => {
        console.log('open modal to login');
      },
    },
    {
      label: 'Logout',
      icon: 'pi pi-fw pi-sign-out',
      command: () => {
        console.log('confirm before login out');
      },
    },
  ];

  activeItem!: MenuItem;

  constructor() {}

  ngOnInit() {}
}
