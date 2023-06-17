import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SkillsComponent } from './skills.component';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { SkillService } from '@app/core/controllers/skill.controller';
import { Skill } from '@app/core/models/skill.interface';

const mockSkillSvc = {
  get: () => of([]),
  updateBulk: () => of({}),
};

describe('SkillsComponent', () => {
  let component: SkillsComponent;
  let fixture: ComponentFixture<SkillsComponent>;
  let skillService: SkillService;

  const mockSkills: Skill[] = [
    {
      id: '1',
      category: {
        id: 1,
        name: 'IT',
        description: '....',
        color: 'orange',
        icon: 'null',
      },
      tags: [
        {
          id: 1,
          name: 'Python',
          description:
            'High-level, interpreted programming language used for software development, web development, data analysis, and artificial intelligence.',
          color: 'green',
          icon: 'fa-python',
        },
      ],
      name: 'Python',
      description: '.',
      level: 70,
    },
    {
      id: '2',
      category: {
        id: 2,
        name: 'Web Development',
        description: '...',
        color: 'blue',
        icon: 'fa-globe',
      },
      tags: [
        {
          id: 2,
          name: 'JavaScript',
          description: '...',
          color: 'yellow',
          icon: 'fa-js',
        },
      ],
      name: 'JavaScript',
      description: '...',
      level: 80,
    },
    {
      id: '3',
      category: {
        id: 3,
        name: 'Data Science',
        description: '...',
        color: 'purple',
        icon: 'fa-database',
      },
      tags: [
        {
          id: 3,
          name: 'R',
          description: '...',
          color: 'blue',
          icon: 'fa-r-project',
        },
      ],
      name: 'R',
      description: '...',
      level: 60,
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SkillsComponent],
      imports: [ReactiveFormsModule],
      providers: [{ provide: SkillService, useValue: mockSkillSvc }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillsComponent);
    component = fixture.componentInstance;
    skillService = TestBed.inject(SkillService);
    spyOn(skillService, 'get').and.returnValue(of(mockSkills));
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load skills on initialization', () => {
    expect(skillService.get).toHaveBeenCalled();
    expect(component.skills).toEqual(mockSkills);
  });
});
