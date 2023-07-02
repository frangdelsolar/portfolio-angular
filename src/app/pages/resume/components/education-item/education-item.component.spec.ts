import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EducationService } from '@app/core/controllers/education.controller';
import { ToastService } from '@app/core/services/toast.service';
import { ConfirmationService } from 'primeng/api';
import { EducationItemComponent } from './education-item.component';

const mockConfirmationSvc = {
  confirm: () => {},
};
const mockEducationSvc = {
  delete: () => {},
};

const mockToastSvc = {
  add: () => {},
};

describe('EducationItemComponent', () => {
  let component: EducationItemComponent;
  let fixture: ComponentFixture<EducationItemComponent>;
  let confirmationSvc: ConfirmationService;
  let educationSvc: EducationService;
  let toastSvc: ToastService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EducationItemComponent],
      providers: [
        { provide: ConfirmationService, useValue: mockConfirmationSvc },
        { provide: EducationService, useValue: mockEducationSvc },
        { provide: ToastService, useValue: mockToastSvc },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationItemComponent);
    component = fixture.componentInstance;
    confirmationSvc = TestBed.inject(ConfirmationService);
    educationSvc = TestBed.inject(EducationService);
    toastSvc = TestBed.inject(ToastService);
    component.item = {
      qualification: 'Bachelor of Science',
      institution: 'University A',
      city: 'City A',
      country: 'Country A',
      start_date: '2020-02-01',
      end_date: '2023-12-28',
      details: 'Education details',
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

  it('should display correct institution and location', () => {
    const qualificationElement =
      fixture.nativeElement.querySelector('#qualification');
    const locationElement = fixture.nativeElement.querySelector('#location');
    expect(qualificationElement.textContent.trim()).toBe('Bachelor of Science');
    expect(locationElement.textContent.trim()).toBe(
      'University A - City A, Country A'
    );
  });

  it('should display education details', () => {
    const detailsElement = fixture.nativeElement.querySelector(
      '.text-sm.line-height-2'
    );
    expect(detailsElement.textContent.trim()).toBe('Education details');
  });

  it('should display tags section', () => {
    const tagElements =
      fixture.nativeElement.querySelectorAll('app-tag-display');
    expect(tagElements.length).toBe(1);
  });
});
