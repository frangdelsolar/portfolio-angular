import { Component, OnInit } from '@angular/core';
import { AppDialogService } from '@app/core/services/app-dialog.service';
import { AuthService } from '@app/core/services/auth.service';
import { ToastService } from '@app/core/services/toast.service';
import { LoginFormComponent } from '@app/pages/auth/components/login-form/login-form.component';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  items: MenuItem[];
  activeItem: MenuItem;
  isAuth: boolean = false;

  constructor(
    private authSvc: AuthService,
    private dialogSvc: AppDialogService,
    private toastSvc: ToastService
  ) {}

  ngOnInit() {
    this.authSvc.isAuthenticatedObservable.subscribe((isAuth: any) => {
      this.isAuth = isAuth;
    });

    this.items = [
      {
        label: 'Resume',
        icon: 'pi pi-fw pi-file',
      },
      {
        label: 'Works',
        icon: 'pi pi-fw pi-briefcase',
      },
      {
        label: 'Blog',
        icon: 'pi pi-fw pi-book',
      },
      {
        label: 'Contact',
        icon: 'pi pi-fw pi-envelope',
      },
    ];

    this.activeItem = this.items[0];
  }

  login() {
    this.dialogSvc.show({
      component: LoginFormComponent,
      params: {
        header: 'Login',
        width: '50%',
        contentStyle: { overflow: 'auto' },
        baseZIndex: 10000,
        maximizable: true,
      },
    });
  }

  logout() {
    this.authSvc.logout();

    this.toastSvc.add({
      severity: 'success',
      summary: 'Log out',
      detail: 'Success',
    });
  }

  onActiveItemChange(event: any) {
    this.activeItem = event;
  }
}
