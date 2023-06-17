import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactComponent } from './contact.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ContactMeService } from '@app/core/controllers/contact-me.controller';
import { ToastService } from '@app/core/services/toast.service';
import { of } from 'rxjs';

const mockContactMeService = {
  send: () => {},
};
const mockToastService = {
  add: () => {},
};

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;
  let contactMeService: ContactMeService;
  let toastService: ToastService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: ContactMeService, useValue: mockContactMeService },
        { provide: ToastService, useValue: mockToastService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    contactMeService = TestBed.inject(ContactMeService);
    toastService = TestBed.inject(ToastService);

    spyOn(toastService, 'add');
    spyOn(contactMeService, 'send').and.returnValue(of({}));

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with the correct controls', () => {
    expect(component.form.get('name')).toBe(component.controlName);
    expect(component.form.get('email')).toBe(component.controlEmail);
    expect(component.form.get('message')).toBe(component.controlMsg);
  });

  it('should call the contactMeSvc.send method and display success message on form submit', () => {
    const formValue = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      message: 'Hello, this is a test message.',
    };
    component.form.patchValue(formValue);

    expect(component.form.valid).toBeTrue();
    expect(component.form.pristine).toBeTrue();

    component.onSendForm();

    expect(contactMeService.send).toHaveBeenCalledWith(formValue);
    expect(toastService.add).toHaveBeenCalledWith({
      severity: 'success',
      summary: 'Success',
      detail: 'Message sent successfully',
    });

    expect(component.buttonProcessing).toBeFalse();
  });
});
