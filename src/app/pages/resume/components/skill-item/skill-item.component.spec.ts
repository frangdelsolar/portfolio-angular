import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SkillItemComponent } from './skill-item.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Skill } from '@app/core/models/skill.interface';
import { ButtonModule } from 'primeng/button';
import { KnobModule } from 'primeng/knob';
import { InputTextComponent } from '@app/shared/input-text/input-text.component';

const mockSkill = {
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
};

describe('SkillItemComponent', () => {
  let component: SkillItemComponent;
  let fixture: ComponentFixture<SkillItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, ButtonModule, KnobModule],
      declarations: [SkillItemComponent, InputTextComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillItemComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form and emit onInit event with form value when a skill is provided', () => {
    component.skill = mockSkill;
    fixture.detectChanges();

    expect(component.form.value).toEqual(mockSkill);
    expect(component.onInit.emit).toHaveBeenCalledWith(component.form);
  });
});
