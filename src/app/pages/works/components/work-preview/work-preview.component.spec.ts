import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { WorkPreviewComponent } from './work-preview.component';

describe('WorkPreviewComponent', () => {
  let component: WorkPreviewComponent;
  let fixture: ComponentFixture<WorkPreviewComponent>;

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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkPreviewComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkPreviewComponent);
    component = fixture.componentInstance;
    component.item = mockItem;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
