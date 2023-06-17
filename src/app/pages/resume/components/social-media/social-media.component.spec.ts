import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { SocialMediaComponent } from './social-media.component';
import { SocialService } from '@app/core/controllers/social.controller';
import { By } from '@angular/platform-browser';

const mockSocialSvc = {
  get: () => of({}),
  update: () => of({}),
};

describe('SocialMediaComponent', () => {
  let component: SocialMediaComponent;
  let fixture: ComponentFixture<SocialMediaComponent>;
  let socialService: SocialService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [SocialMediaComponent],
      providers: [{ provide: SocialService, useValue: mockSocialSvc }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialMediaComponent);
    component = fixture.componentInstance;
    socialService = TestBed.inject(SocialService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with data from the service', () => {
    const mockData = {
      github: 'https://github.com/example',
      linkedin: 'https://linkedin.com/example',
    };
    spyOn(socialService, 'get').and.returnValue(of(mockData));

    fixture.detectChanges();

    expect(component.form.value).toEqual(mockData);
  });
});
