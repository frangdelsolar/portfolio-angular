import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { WorkListComponent } from './work-list.component';
import { WorkService } from '@app/core/controllers/work.controller';
import { AppDialogService } from '@app/core/services/app-dialog.service';
import { WorkItemComponent } from '../work-item/work-item.component';

describe('WorkListComponent', () => {
  let component: WorkListComponent;
  let fixture: ComponentFixture<WorkListComponent>;
  let workServiceSpy: jasmine.SpyObj<WorkService>;
  let dialogServiceSpy: jasmine.SpyObj<AppDialogService>;

  const mockWorks = [
    { id: 1, title: 'Work 1' },
    { id: 2, title: 'Work 2' },
    { id: 3, title: 'Work 3' },
  ];

  beforeEach(() => {
    workServiceSpy = jasmine.createSpyObj('WorkService', ['get']);
    dialogServiceSpy = jasmine.createSpyObj('AppDialogService', ['show']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [WorkListComponent],
      providers: [
        { provide: WorkService, useValue: workServiceSpy },
        { provide: AppDialogService, useValue: dialogServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkListComponent);
    component = fixture.componentInstance;
  });

  beforeEach(() => {
    workServiceSpy.get.and.returnValue(of(mockWorks));

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
