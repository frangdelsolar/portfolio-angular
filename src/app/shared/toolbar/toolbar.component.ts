import { Component, OnInit } from '@angular/core';
import { AppDialogService } from '@app/core/services/app-dialog.service';
import { ToastService } from '@app/core/services/toast.service';
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

  constructor(
    private dialogSvc: AppDialogService,
    private toastSvc: ToastService
  ) {}

  ngOnInit() {
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
  }

  login() {
    console.log('login');
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

  logout() {
    console.log('confirm before login out');
    this.toastSvc.add({
      severity: 'success',
      summary: 'Log out',
      detail: 'Success',
    });
  }

  onActiveItemChange(event: any) {
    console.log(event);
    this.activeItem = event;
  }
}
