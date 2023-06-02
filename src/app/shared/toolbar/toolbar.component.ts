import { Component, OnInit } from '@angular/core';
import { AppDialogService } from '@app/core/services/app-dialog.service';
import { LoginComponent } from '@app/pages/auth/login/login.component';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  items: MenuItem[];
  activeItem: MenuItem;

  constructor(private dialogSvc: AppDialogService) {}

  ngOnInit() {
    this.items = [
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
          this.showLogin();
        },
      },
      {
        label: 'Logout',
        icon: 'pi pi-fw pi-sign-out',
        skipLocationChange: true,
        command: () => {
          console.log('confirm before login out');
        },
      },
    ];
  }

  showLogin() {
    this.dialogSvc.show({
      component: LoginComponent,
      params: {
        header: 'Login',
        width: '50%',
        contentStyle: { overflow: 'auto' },
        baseZIndex: 10000,
        maximizable: true,
      },
    });
  }
}
