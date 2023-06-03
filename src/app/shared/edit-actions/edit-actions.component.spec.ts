import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonModule } from 'primeng/button';

import { EditActionsComponent } from './edit-actions.component';

describe('EditActionsComponent', () => {
  let component: EditActionsComponent;
  let fixture: ComponentFixture<EditActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditActionsComponent],
      imports: [ButtonModule],
    }).compileComponents();

    fixture = TestBed.createComponent(EditActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change editMode onEditClick', () => {
    component.editModeOn = false;
    component.onEditClick();
    fixture.detectChanges();
    expect(component.editModeOn).toBeTruthy();
  });
});
