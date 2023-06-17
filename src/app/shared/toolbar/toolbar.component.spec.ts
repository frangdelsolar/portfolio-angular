import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToolbarComponent } from './toolbar.component';
import { MenuItem } from 'primeng/api';
import { AuthService } from '@app/core/services/auth.service';
import { AppDialogService } from '@app/core/services/app-dialog.service';
import { ToastService } from '@app/core/services/toast.service';
import { LoginFormComponent } from '@app/pages/auth/components/login-form/login-form.component';
import { By } from '@angular/platform-browser';
import { CardComponent } from '../card/card.component';
import { TabMenuComponent } from '../tab-menu/tab-menu.component';

import { ActivatedRoute } from '@angular/router';
import { CardModule } from 'primeng/card';
import { TabMenuModule } from 'primeng/tabmenu';
import { ButtonModule } from 'primeng/button';
import { Subject } from 'rxjs';

const mockAuthSvc = {
  logout: jasmine.createSpy('logout'),
  isAuthenticatedObservable: new Subject<boolean>(),
};

const mockDialogSvc = {
  open: jasmine.createSpy('open'),
  show: jasmine.createSpy('show'),
};

const mockToastSvc = {
  add: jasmine.createSpy('add'),
};

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;
  let authService: AuthService;
  let dialogService: AppDialogService;
  let toastService: ToastService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonModule, CardModule, TabMenuModule],
      declarations: [ToolbarComponent, TabMenuComponent, CardComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { data: { items: [] } } },
        },
        { provide: AuthService, useValue: mockAuthSvc },
        { provide: AppDialogService, useValue: mockDialogSvc },
        { provide: ToastService, useValue: mockToastSvc },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    dialogService = TestBed.inject(AppDialogService);
    toastService = TestBed.inject(ToastService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the items and activeItem properties', () => {
    expect(component.items).toBeTruthy();
    expect(component.items.length).toBeGreaterThan(0);

    expect(component.activeItem).toBeTruthy();
  });

  it('should set isAuth to false by default', () => {
    expect(component.isAuth).toBeFalse();
  });

  it('should call authService.isAuthenticatedObservable.subscribe on ngOnInit', () => {
    spyOn(authService.isAuthenticatedObservable, 'subscribe');
    component.ngOnInit();

    expect(authService.isAuthenticatedObservable.subscribe).toHaveBeenCalled();
  });

  it('should render the login button when isAuth is false', () => {
    component.isAuth = false;
    fixture.detectChanges();
    const loginButton = fixture.debugElement.query(
      By.css('p-button[label="Login"]')
    );

    expect(loginButton).toBeTruthy();
  });

  it('should render the logout button when isAuth is true', () => {
    component.isAuth = true;
    fixture.detectChanges();
    const logoutButton = fixture.debugElement.query(
      By.css('p-button[label="Logout"]')
    );

    expect(logoutButton).toBeTruthy();
  });
});
