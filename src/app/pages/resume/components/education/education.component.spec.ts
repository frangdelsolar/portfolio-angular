import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EducationComponent } from './education.component';
import { EducationService } from '@app/core/controllers/education.controller';
import { of } from 'rxjs';

describe('EducationComponent', () => {
  let component: EducationComponent;
  let fixture: ComponentFixture<EducationComponent>;
  let educationServiceSpy: jasmine.SpyObj<EducationService>;

  beforeEach(async () => {
    const educationServiceMock = jasmine.createSpyObj('EducationService', [
      'get',
    ]);

    await TestBed.configureTestingModule({
      declarations: [EducationComponent],
      providers: [
        { provide: EducationService, useValue: educationServiceMock },
      ],
    }).compileComponents();

    educationServiceSpy = TestBed.inject(
      EducationService
    ) as jasmine.SpyObj<EducationService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch education data on initialization', () => {
    const mockEducation = [
      { id: 1, institution: 'University A', degree: 'Bachelor' },
      { id: 2, institution: 'University B', degree: 'Master' },
    ];

    educationServiceSpy.get.and.returnValue(of(mockEducation));

    fixture.detectChanges();

    expect(component.education).toEqual(mockEducation);
  });
});
