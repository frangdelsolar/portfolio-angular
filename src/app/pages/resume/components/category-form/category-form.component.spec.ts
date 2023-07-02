import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoryService } from '@app/core/controllers/category.controller';
import { of } from 'rxjs';

import { CategoryFormComponent } from './category-form.component';

const categoryMockSvc = {
  create: () =>
    of({ id: 1, name: 'New Category', description: 'Category description' }),
};

describe('CategoryFormComponent', () => {
  let component: CategoryFormComponent;
  let fixture: ComponentFixture<CategoryFormComponent>;
  let categorySvc: CategoryService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoryFormComponent],
      imports: [ReactiveFormsModule],
      providers: [{ provide: CategoryService, useValue: categoryMockSvc }],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryFormComponent);
    component = fixture.componentInstance;
    categorySvc = TestBed.inject(CategoryService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit onSave event with the created category when onSaveClick is called', waitForAsync(() => {
    const onSaveSpy = spyOn(component.onSave, 'emit');
    component.categoryNameControl.setValue('New Category');
    component.categoryDescriptionControl.setValue('Category description');

    component.onSaveClick();

    fixture.whenStable().then(() => {
      expect(onSaveSpy).toHaveBeenCalledWith({
        id: 1,
        name: 'New Category',
        description: 'Category description',
      });
    });
  }));

  it('should not emit onSave event when onSaveClick is called and the form is invalid', () => {
    const onSaveSpy = spyOn(component.onSave, 'emit');

    component.onSaveClick();

    expect(onSaveSpy).not.toHaveBeenCalled();
  });
});
