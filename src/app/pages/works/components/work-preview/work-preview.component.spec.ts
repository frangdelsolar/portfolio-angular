import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkPreviewComponent } from './work-preview.component';

describe('WorkCardComponent', () => {
  let component: WorkPreviewComponent;
  let fixture: ComponentFixture<WorkPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkPreviewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
