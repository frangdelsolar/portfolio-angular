import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ExperienceService } from '@app/core/controllers/experience.controller';
import { AppDialogService } from '@app/core/services/app-dialog.service';
import { ToastService } from '@app/core/services/toast.service';
import { of, throwError } from 'rxjs';

import { ExperienceFormComponent } from './experience-form.component';

const mockDialogSvc = {
  close: () => {},
  DialogDataObservable: of({ data: {} }),
};

const mockToastSvc = {
  add: () => {},
};

const mockExperienceSvc = {
  delete: () => {},
  update: () => {},
  create: () => {},
};

describe('ExperienceFormComponent', () => {
  let component: ExperienceFormComponent;
  let fixture: ComponentFixture<ExperienceFormComponent>;
  let experienceSvc: ExperienceService;
  let toastSvc: ToastService;
  let dialogSvc: AppDialogService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ExperienceFormComponent],
      providers: [
        { provide: ExperienceService, useValue: mockExperienceSvc },
        { provide: ToastService, useValue: mockToastSvc },
        { provide: AppDialogService, useValue: mockDialogSvc },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ExperienceFormComponent);
    component = fixture.componentInstance;
    experienceSvc = TestBed.inject(ExperienceService);
    toastSvc = TestBed.inject(ToastService);
    dialogSvc = TestBed.inject(AppDialogService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call experienceSvc.create when onSaveClick is called', () => {
    spyOn(experienceSvc, 'create').and.returnValue(of({}));
    spyOn(dialogSvc, 'close');
    component.onSaveClick();
    expect(experienceSvc.create).toHaveBeenCalledWith(component.form.value);
    expect(dialogSvc.close).toHaveBeenCalled();
  });

  it('should display an error toast when create API call fails', () => {
    const errorMessage = 'Create API failed';
    spyOn(experienceSvc, 'create').and.returnValue(
      throwError({ error: { detail: errorMessage } })
    );
    spyOn(toastSvc, 'add');
    component.onSaveClick();
    expect(toastSvc.add).toHaveBeenCalledWith({
      severity: 'error',
      summary: 'Error',
      detail: errorMessage,
    });
  });

  it('should call experienceSvc.update when onUpdateClick is called', () => {
    spyOn(experienceSvc, 'update').and.returnValue(of({}));
    spyOn(dialogSvc, 'close');
    component.item = { id: 1 };
    component.onUpdateClick();
    expect(experienceSvc.update).toHaveBeenCalledWith(1, component.form.value);
    expect(dialogSvc.close).toHaveBeenCalled();
  });

  it('should display an error toast when update API call fails', () => {
    const errorMessage = 'Update API failed';
    spyOn(experienceSvc, 'update').and.returnValue(
      throwError({ error: { detail: errorMessage } })
    );
    spyOn(toastSvc, 'add');
    component.item = { id: 1 };
    component.onUpdateClick();
    expect(toastSvc.add).toHaveBeenCalledWith({
      severity: 'error',
      summary: 'Error',
      detail: errorMessage,
    });
  });
});
