import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExperienceItemComponent } from './experience-item.component';

describe('ExperienceItemComponent', () => {
  let component: ExperienceItemComponent;
  let fixture: ComponentFixture<ExperienceItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExperienceItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperienceItemComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.experience = {
      title: 'Software Developer',
      company: 'Company A',
      city: 'City A',
      country: 'Country A',
      start_date: '2020-01-01',
      end_date: '2023-12-31',
      description: 'Experience description',
      tags: [{ name: 'Tag 1' }, { name: 'Tag 2' }],
    };

    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should display correct dates', () => {
    component.experience = {
      title: 'Software Developer',
      company: 'Company A',
      city: 'City A',
      country: 'Country A',
      start_date: '2020-02-01',
      end_date: '2023-12-31',
      description: 'Experience description',
      tags: [{ name: 'Tag 1' }, { name: 'Tag 2' }],
    };

    fixture.detectChanges();

    const datesElement = fixture.nativeElement.querySelector(
      '.flex.flex-column.col-3 h4'
    );
    expect(datesElement.textContent.trim()).toBe('2020 to 2023');
  });

  it('should display correct title, company, and location', () => {
    component.experience = {
      title: 'Software Developer',
      company: 'Company A',
      city: 'City A',
      country: 'Country A',
      start_date: '2020-01-01',
      end_date: '2023-12-31',
      description: 'Experience description',
      tags: [{ name: 'Tag 1' }, { name: 'Tag 2' }],
    };

    fixture.detectChanges();

    const titleElement = fixture.nativeElement.querySelector(
      '.flex.flex-column.col-8 h3'
    );
    const companyLocationElement = fixture.nativeElement.querySelector(
      '.flex.flex-column.col-8 h4'
    );
    expect(titleElement.textContent.trim()).toBe('Software Developer');
    expect(companyLocationElement.textContent.trim()).toBe(
      'Company A - City A, Country A'
    );
  });

  it('should display experience description', () => {
    component.experience = {
      title: 'Software Developer',
      company: 'Company A',
      city: 'City A',
      country: 'Country A',
      start_date: '2020-01-01',
      end_date: '2023-12-31',
      description: 'Experience description',
      tags: [{ name: 'Tag 1' }, { name: 'Tag 2' }],
    };

    fixture.detectChanges();

    const descriptionElement = fixture.nativeElement.querySelector(
      '.text-sm.line-height-2'
    );
    expect(descriptionElement.textContent.trim()).toBe(
      'Experience description'
    );
  });

  it('should display tags', () => {
    component.experience = {
      title: 'Software Developer',
      company: 'Company A',
      city: 'City A',
      country: 'Country A',
      start_date: '2020-01-01',
      end_date: '2023-12-31',
      description: 'Experience description',
      tags: [{ name: 'Tag 1' }, { name: 'Tag 2' }],
    };

    fixture.detectChanges();

    const tagElements = fixture.nativeElement.querySelectorAll(
      '.flex.flex-row.flex-wrap.gap-3 app-tag'
    );
    expect(tagElements.length).toBe(2);
  });
});
