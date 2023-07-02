import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { WorkItemComponent } from './work-item.component';
import { AppDialogService } from '@app/core/services/app-dialog.service';
import { WorkService } from '@app/core/controllers/work.controller';
import { of } from 'rxjs';
import { InputTextComponent } from '@app/shared/input-text/input-text.component';
import { InputEditorComponent } from '@app/shared/input-editor/input-editor.component';
import { InputTextAreaComponent } from '@app/shared/input-text-area/input-text-area.component';
import { By } from '@angular/platform-browser';
import { ConfirmationService } from 'primeng/api';

const mockItem = {
  id: 3,
  image: {
    name: 'Francisco Javier González del Solar',
    description: '',
    image_url:
      'http://localhost:8000/media/images/Captura_de_pantalla_2023-01-11_a_las_19.58.36.png',
    thumbnail_url:
      'http://localhost:8000/media/thumbnails/Captura_de_pantalla_2023-01-11_a_las_19_thumbnail.jpg',
  },
  category: {
    id: 1,
    name: 'IT',
    description:
      'The IT industry comprises companies that develop, manufacture, and provide technology products, services, and solutions, including hardware, software, telecommunications, and digital services.',
    color: 'orange',
    icon: 'null',
  },
  tags: [
    {
      id: 5,
      name: 'C#',
      description:
        'Object-oriented programming language developed by Microsoft, widely used for building Windows applications.',
      color: 'Purple',
      icon: 'fa-code',
    },
    {
      id: 7,
      name: 'Java',
      description:
        'Versatile, object-oriented programming language used for developing enterprise-level applications.',
      color: 'Orange',
      icon: 'fa-java',
    },
    {
      id: 9,
      name: 'TypeScript',
      description:
        'Strict syntactical superset of JavaScript that adds optional static typing, enhancing code maintainability.',
      color: 'Blue',
      icon: 'fa-js',
    },
  ],
  title: 'Work 2',
  project: 'ADP',
  client: 'Freelance',
  start_date: '2023-06-07',
  end_date: '',
  repository: 'afsdfa',
  url: 'https://www.gsproyectosciviles.com/',
  content: 'Content Content Content Content Content Content Content',
  preview: 'Content Content Content Content Content',
  date_posted: '2023-06-07T18:01:28.109562',
  date_updated: '2023-06-07T18:01:28.109616',
  author: 1,
};

const mockDialogSvc = {
  open: jasmine.createSpy('open'),
  show: jasmine.createSpy('show'),
  get DialogDataObservable() {
    return of({ data: mockItem });
  },
};

const mockWorkSvc = {
  update: jasmine.createSpy('update'),
};

const mockConfirmationSvc = {
  confirm: jasmine.createSpy('confirm'),
};

describe('WorkItemComponent', () => {
  let component: WorkItemComponent;
  let fixture: ComponentFixture<WorkItemComponent>;
  let dialogService: AppDialogService;
  let workService: WorkService;
  let confirmationSvc: ConfirmationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [
        WorkItemComponent,
        InputTextComponent,
        InputEditorComponent,
        InputTextAreaComponent,
      ],
      providers: [
        { provide: AppDialogService, useValue: mockDialogSvc },
        { provide: WorkService, useValue: mockWorkSvc },
        { provide: ConfirmationService, useValue: mockConfirmationSvc },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkItemComponent);
    component = fixture.componentInstance;
    dialogService = TestBed.inject(AppDialogService);
    workService = TestBed.inject(WorkService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with the correct controls', () => {
    expect(component.form.contains('client')).toBe(true);
    expect(component.form.contains('content')).toBe(true);
    expect(component.form.contains('preview')).toBe(true);
    expect(component.form.contains('project')).toBe(true);
    expect(component.form.contains('repository')).toBe(true);
    expect(component.form.contains('start_date')).toBe(true);
    expect(component.form.contains('technologies')).toBe(true);
    expect(component.form.contains('title')).toBe(true);
    expect(component.form.contains('url')).toBe(true);
  });
});
