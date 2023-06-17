import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonalDetailsComponent } from './personal-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PersonalService } from '@app/core/controllers/personal.controller';
import { of } from 'rxjs';

const mockPersonalSvc = {
  get: () => {},
};

describe('PersonalDetailsComponent', () => {
  let component: PersonalDetailsComponent;
  let fixture: ComponentFixture<PersonalDetailsComponent>;
  let personalService: PersonalService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [PersonalDetailsComponent],
      providers: [{ provide: PersonalService, useValue: mockPersonalSvc }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalDetailsComponent);
    component = fixture.componentInstance;
    personalService = TestBed.inject(PersonalService);
  });

  it('should create', () => {
    spyOn(personalService, 'get').and.returnValue(
      of({
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
        phone: '1234567890',
        city: 'New York',
        country: 'USA',
        profile_picture: {
          description: 'Profile Picture',
          image_url: 'https://example.com/profile.jpg',
        },
      })
    );

    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should display personal details correctly when edit mode is off', () => {
    spyOn(personalService, 'get').and.returnValue(
      of({
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
        phone: '1234567890',
        city: 'New York',
        country: 'USA',
        profile_picture: {
          description: 'Profile Picture',
          image_url: 'https://example.com/profile.jpg',
        },
      })
    );

    fixture.detectChanges();

    expect(component.editModeOn).toBeFalse();

    const fullNameElement = fixture.nativeElement.querySelector('#fullName');
    expect(fullNameElement.textContent).toBe(' John Doe ');

    const locationElement = fixture.nativeElement.querySelector('#location');
    expect(locationElement.textContent).toBe(' New York, USA ');
  });
});
