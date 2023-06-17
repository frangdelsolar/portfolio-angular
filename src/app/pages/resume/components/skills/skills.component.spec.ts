import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SkillService } from '@app/core/controllers/skill.controller';
import { of } from 'rxjs';

import { SkillsComponent } from './skills.component';

const mockSkillSvc = {
  get: () => {},
};

describe('SkillsComponent', () => {
  let component: SkillsComponent;
  let fixture: ComponentFixture<SkillsComponent>;
  let skillService: SkillService;

  beforeEach(async () => {
    const skillServiceMock = {
      get: jasmine.createSpy('get').and.returnValue(of([])),
      updateBulk: jasmine.createSpy('updateBulk').and.returnValue(of({})),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [SkillsComponent],
      providers: [{ provide: SkillService, useValue: skillServiceMock }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillsComponent);
    component = fixture.componentInstance;
    skillService = TestBed.inject(SkillService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
