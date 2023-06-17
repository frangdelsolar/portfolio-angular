import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SkillItemComponent } from './skill-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Skill } from '@app/core/models/skill.interface';

describe('SkillItemComponent', () => {
  let component: SkillItemComponent;
  let fixture: ComponentFixture<SkillItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [SkillItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillItemComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should emit form control changes when skill item is updated', () => {
  //   spyOn(component.formControlChange, 'emit');

  //   const skill: Skill = {
  //     id: '1',
  //     category: {
  //       id: 1,
  //       name: 'IT',
  //       description:
  //         'The IT industry comprises companies that develop, manufacture, and provide technology products, services, and solutions, including hardware, software, telecommunications, and digital services.',
  //       color: 'orange',
  //       icon: 'pi-desktop',
  //     },
  //     tags: [
  //       {
  //         id: 1,
  //         name: 'Python',
  //         description:
  //           'High-level, interpreted programming language used for software development, web development, data analysis, and artificial intelligence.',
  //         color: 'green',
  //         icon: 'fa-python',
  //       },
  //     ],
  //     name: 'Python',
  //     description: '.',
  //     level: 70,
  //   };

  //   component.skill = skill;
  //   component.ngOnInit();

  //   const nameElement = fixture.nativeElement.querySelector('input');
  //   nameElement.value = 'Web Development';
  //   nameElement.dispatchEvent(new Event('input'));

  //   fixture.detectChanges();

  //   expect(component.formControlChange.emit).toHaveBeenCalledWith(
  //     component.form
  //   );
  //   expect(component.form.value.name).toBe('Web Development');
  // });
});
