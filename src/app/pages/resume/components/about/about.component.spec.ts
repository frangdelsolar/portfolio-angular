import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutComponent } from './about.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AboutService } from '@app/core/controllers/about.controller';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const mockAboutService = {
  get: () => {},
  update: () => {},
};

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;
  let aboutService: AboutService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AboutComponent],
      providers: [
        FormBuilder,
        { provide: AboutService, useValue: mockAboutService },
        HttpClient,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    aboutService = TestBed.inject(AboutService);

    spyOn(aboutService, 'get').and.returnValue(
      of({ content: '<h1>About Me Content</h1>' })
    );

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form and load the about content', () => {
    expect(component.form).toBeDefined();
    expect(component.aboutHtmlControl.value).toBe('<h1>About Me Content</h1>');
  });

  it('should call the aboutService update method and update the form value on save', () => {
    const updatedContent = 'Updated About Me Content';
    spyOn(aboutService, 'update').and.returnValue(
      of({ content: updatedContent })
    );

    component.editModeOn = true;
    component.aboutHtmlControl.setValue(updatedContent);
    component.onSaveClick();

    expect(aboutService.update).toHaveBeenCalledWith({ about: updatedContent });
    expect(component.form.value.about).toBe(updatedContent);
    expect(component.editModeOn).toBe(false);
  });
});
