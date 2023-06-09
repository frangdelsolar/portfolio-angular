import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Output() activeTabChange: EventEmitter<string> = new EventEmitter();

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
        routerLink: [''],
      },
      {
        label: 'Works',
        icon: 'pi pi-fw pi-briefcase',
        routerLink: ['/works'],
      },
      {
        label: 'Blog',
        icon: 'pi pi-fw pi-book',
        routerLink: ['/blog'],
      },
      {
        label: 'Contact',
        icon: 'pi pi-fw pi-envelope',
        routerLink: ['/contact'],
      },
    ];
  }

  login() {
    this.dialogSvc.show({
      component: LoginFormComponent,
      params: {
        header: 'Login',
        width: '30%',
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
}
