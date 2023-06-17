import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExperienceService } from '@app/core/controllers/experience.controller';
import { ExperienceComponent } from './experience.component';
import { of } from 'rxjs';

const mockExperienceSvc = {
  get: () => {},
};

describe('ExperienceComponent', () => {
  let component: ExperienceComponent;
  let fixture: ComponentFixture<ExperienceComponent>;
  let experienceService: ExperienceService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExperienceComponent],
      providers: [{ provide: ExperienceService, useValue: mockExperienceSvc }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperienceComponent);
    experienceService = TestBed.inject(ExperienceService);

    component = fixture.componentInstance;
  });

  it('should create', () => {
    spyOn(experienceService, 'get').and.returnValue(
      of([
        { category: { name: 'Category A' }, title: 'Experience 1' },
        { category: { name: 'Category A' }, title: 'Experience 2' },
        { category: { name: 'Category B' }, title: 'Experience 3' },
      ])
    );

    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should categorize experiences correctly', () => {
    spyOn(experienceService, 'get').and.returnValue(
      of([
        { category: { name: 'Category A' }, title: 'Experience 1' },
        { category: { name: 'Category A' }, title: 'Experience 2' },
        { category: { name: 'Category B' }, title: 'Experience 3' },
      ])
    );

    fixture.detectChanges();

    expect(component.categories.length).toBe(2);

    const categoryA = component.categories.find(
      (category) => category.label === 'Category A'
    );
    const categoryB = component.categories.find(
      (category) => category.label === 'Category B'
    );

    expect(categoryA.experiences.length).toBe(2);
    expect(categoryA.experiences[0].title).toBe('Experience 1');
    expect(categoryA.experiences[1].title).toBe('Experience 2');

    expect(categoryB.experiences.length).toBe(1);
    expect(categoryB.experiences[0].title).toBe('Experience 3');
  });
});
