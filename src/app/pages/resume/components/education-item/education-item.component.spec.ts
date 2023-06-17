import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EducationItemComponent } from './education-item.component';

describe('EducationItemComponent', () => {
  let component: EducationItemComponent;
  let fixture: ComponentFixture<EducationItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EducationItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationItemComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
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

    expect(component).toBeTruthy();
  });

  it('should display correct dates', () => {
    component.item = {
      qualification: 'Bachelor of Science',
      institution: 'University A',
      city: 'City A',
      country: 'Country A',
      start_date: '2020-02-01',
      end_date: '2023-12-31',
      details: 'Education details',
      tags: [{ name: 'Tag 1' }, { name: 'Tag 2' }],
    };

    fixture.detectChanges();

    const datesElement = fixture.nativeElement.querySelector(
      '.flex.flex-column.col-3 h4'
    );
    expect(datesElement.textContent.trim()).toBe('2020 to 2023');
  });

  it('should display correct institution and location', () => {
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

    const institutionElement = fixture.nativeElement.querySelector(
      '.flex.flex-column.col-8 h3'
    );
    const locationElement = fixture.nativeElement.querySelector(
      '.flex.flex-column.col-8 h4'
    );
    expect(institutionElement.textContent.trim()).toBe('Bachelor of Science');
    expect(locationElement.textContent.trim()).toBe(
      'University A - City A, Country A'
    );
  });

  it('should display education details', () => {
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

    const detailsElement = fixture.nativeElement.querySelector(
      '.text-sm.line-height-2'
    );
    expect(detailsElement.textContent.trim()).toBe('Education details');
  });

  it('should display tags', () => {
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

    const tagElements = fixture.nativeElement.querySelectorAll(
      '.flex.flex-row.flex-wrap.gap-3 app-tag'
    );
    expect(tagElements.length).toBe(2);
  });
});
