import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExperienceService } from '@app/core/controllers/experience.controller';
import { AppDialogService } from '@app/core/services/app-dialog.service';
import { ToastService } from '@app/core/services/toast.service';
import { ConfirmationService } from 'primeng/api';
import { of } from 'rxjs';
import { ExperienceItemComponent } from './experience-item.component';

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

const mockConfirmationSvc = {
  confirm: () => {},
};

describe('ExperienceItemComponent', () => {
  let component: ExperienceItemComponent;
  let fixture: ComponentFixture<ExperienceItemComponent>;
  let dialogSvc: AppDialogService;
  let confirmationService: ConfirmationService;
  let experienceSvc: ExperienceService;
  let toastSvc: ToastService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExperienceItemComponent],
      providers: [
        { provide: ExperienceService, useValue: mockExperienceSvc },
        { provide: ToastService, useValue: mockToastSvc },
        { provide: AppDialogService, useValue: mockDialogSvc },
        { provide: ConfirmationService, useValue: mockConfirmationSvc },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperienceItemComponent);
    component = fixture.componentInstance;
    component.experience = {
      title: 'Software Developer',
      company: 'Company A',
      city: 'City A',
      country: 'Country A',
      start_date: '2020-02-01',
      end_date: '2023-12-28',
      description: 'Experience description',
      tags: [{ name: 'Tag 1' }, { name: 'Tag 2' }],
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display correct dates', () => {
    const datesElement = fixture.nativeElement.querySelector('#dates');
    expect(datesElement.textContent.trim()).toBe('2020 to 2023');
  });

  it('should display correct title, company, and location', () => {
    const titleElement = fixture.nativeElement.querySelector('#title');
    const companyLocationElement =
      fixture.nativeElement.querySelector('#subtitle');
    expect(titleElement.textContent.trim()).toBe('Software Developer');
    expect(companyLocationElement.textContent.trim()).toBe(
      'Company A - City A, Country A'
    );
  });

  it('should display experience description', () => {
    const descriptionElement =
      fixture.nativeElement.querySelector('#description');
    expect(descriptionElement.textContent.trim()).toBe(
      'Experience description'
    );
  });

  it('should display tag section', () => {
    const tagElements =
      fixture.nativeElement.querySelectorAll('app-tag-display');
    expect(tagElements.length).toBe(1);
  });
});
