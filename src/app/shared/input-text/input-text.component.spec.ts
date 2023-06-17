import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { InputTextComponent } from './input-text.component';

describe('InputTextComponent', () => {
  let component: InputTextComponent;
  let fixture: ComponentFixture<InputTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputTextComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set the initial value correctly', () => {
    const initialValue = 'Initial Value';
    component.control = new FormControl(initialValue);
    fixture.detectChanges();
    expect(component.control.value).toBe(initialValue);
  });

  it('should emit the updated value on input change', () => {
    const newValue = 'New Value';
    spyOn(component.valueChange, 'emit');

    component.onChange(newValue);

    expect(component.valueChange.emit).toHaveBeenCalledWith(newValue);
    expect(component.value).toBe(newValue);
  });
});
