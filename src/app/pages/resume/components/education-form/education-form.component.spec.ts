import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { EducationService } from '@app/core/controllers/education.controller';
import { AppDialogService } from '@app/core/services/app-dialog.service';
import { ToastService } from '@app/core/services/toast.service';
import { ConfirmationService } from 'primeng/api';
import { of } from 'rxjs';
import { EducationFormComponent } from './education-form.component';

const mockConfirmationSvc = {
  confirm: () => {},
};
const mockEducationSvc = {
  delete: () => {},
  update: () => {},
  create: () => {},
};

const mockToastSvc = {
  add: () => {},
};

const mockDialogSvc = {
  close: () => {},
  DialogDataObservable: of({ data: {} }),
};

describe('EducationFormComponent', () => {
  let component: EducationFormComponent;
  let fixture: ComponentFixture<EducationFormComponent>;
  let confirmationSvc: ConfirmationService;
  let educationSvc: EducationService;
  let toastSvc: ToastService;
  let dialogSvc: AppDialogService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EducationFormComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: ConfirmationService, useValue: mockConfirmationSvc },
        { provide: EducationService, useValue: mockEducationSvc },
        { provide: ToastService, useValue: mockToastSvc },
        { provide: AppDialogService, useValue: mockDialogSvc },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EducationFormComponent);
    component = fixture.componentInstance;
    confirmationSvc = TestBed.inject(ConfirmationService);
    educationSvc = TestBed.inject(EducationService);
    toastSvc = TestBed.inject(ToastService);
    dialogSvc = TestBed.inject(AppDialogService);
    component.item = {
      qualification: 'Bachelor of Science',
      institution: 'University A',
      city: 'City A',
      country: 'Country A',
      start_date: '2020-01-01',
      end_date: '2023-12-31',
      details: 'Education details',
      tags: [{ name: 'Tag 1' }, { name: 'Tag 2' }],
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with item data', () => {
    expect(component.form.value).toEqual({
      qualification: 'Bachelor of Science',
      institution: 'University A',
      city: 'City A',
      country: 'Country A',
      start_date: new Date('2020-01-01'),
      end_date: new Date('2023-12-31'),
      details: 'Education details',
      category: '',
      tags: ['Tag 1', 'Tag 2'],
    });
  });

  it('should save education on save click', () => {
    const educationServiceSpy = spyOn(educationSvc, 'create').and.returnValue(
      of({})
    );
    const closeDialogSpy = spyOn(dialogSvc, 'close');
    component.item = null;
    fixture.detectChanges();

    component.form.setValue({
      qualification: 'Bachelor of Science',
      institution: 'University A',
      city: 'City A',
      country: 'Country A',
      start_date: new Date('2020-01-01'),
      end_date: new Date('2023-12-31'),
      details: 'Education details',
      category: '',
      tags: ['Tag 1', 'Tag 2'],
    });
    component.onSaveClick();

    expect(educationServiceSpy).toHaveBeenCalledWith(component.form.value);
    expect(closeDialogSpy).toHaveBeenCalled();
  });

  it('should update education on update click', () => {
    const educationServiceSpy = spyOn(educationSvc, 'update').and.returnValue(
      of({})
    );
    const closeDialogSpy = spyOn(dialogSvc, 'close');
    component.item = {
      id: 1,
      qualification: 'Bachelor of Science',
      institution: 'University A',
      city: 'City A',
      country: 'Country A',
      start_date: '2020-01-01',
      end_date: '2023-12-31',
      details: 'Education details',
      tags: [{ name: 'Tag 1' }, { name: 'Tag 2' }],
    };
    fixture.detectChanges();

    component.form.setValue({
      qualification: 'Bachelor of Science',
      institution: 'University A',
      city: 'City A',
      country: 'Country A',
      start_date: new Date('2020-01-01'),
      end_date: new Date('2023-12-31'),
      details: 'Education details',
      category: '',
      tags: ['Tag 1', 'Tag 2'],
    });
    component.onUpdateClick();

    expect(educationServiceSpy).toHaveBeenCalledWith(1, component.form.value);
    expect(closeDialogSpy).toHaveBeenCalled();
  });
});
