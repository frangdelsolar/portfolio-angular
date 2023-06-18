import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SkillService } from '@app/core/controllers/skill.controller';
import { Skill } from '@app/core/models/skill.interface';
import { DeleteItem } from '../skill-item/skill-item.component';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
})
export class SkillsComponent implements OnInit {
  editModeOn: boolean = false;
  form: FormGroup;

  skills: Skill[] = [];
  newSkills: Skill[] = [];
  newSkillsCount: number = 0;
  newSkillsForms: FormGroup[] = [];
  deleteSkills: string[] = [];
  updateSkills: FormGroup[] = [];

  constructor(private fb: FormBuilder, private skillSvc: SkillService) {
    this.form = this.fb.group({
      skills: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.skillSvc.get().subscribe((res: any) => {
      this.skills = res;
    });
  }

  onSaveClick() {
    if (this.form.valid) {
      let data: any[] = [];
      this.form.value.skills.forEach((skill: FormControl) => {
        data.push(skill.value);
      });

      // DELETE
      this.deleteSkillsArray();

      // CREATE
      this.createNewSkills();

      // UPDATE
      this.updateSkillsArray();
    }
  }

  updateSkillsArray() {
    this.updateSkills.forEach((form) => {
      this.skillSvc.update(form.value).subscribe((res) => {});
    });
  }

  createNewSkills() {
    this.newSkillsForms.forEach((form) => {
      if (form.value.name == '' || form.value.name == null) return;
      this.skillSvc.create(form.value).subscribe((res: any) => {
        if (res.id) {
          this.skills.push({ ...form.value, id: res.id });
        }
      });
    });
    this.newSkills = [];
    this.newSkillsForms = [];
  }

  deleteSkillsArray() {
    this.deleteSkills.forEach((id: string | null) => {
      this.skills = this.skills.filter((skill) => skill.id !== id);
      if (id) {
        this.skillSvc.delete(id).subscribe((res) => {});
      }
    });
  }

  onSkillFormChange(event: any) {
    if (event.isNew) {
      return;
    }
    if (!this.updateSkills.includes(event.form)) {
      this.updateSkills.push(event.form);
    }
  }

  onDeleteSkillChange(event: DeleteItem) {
    if (event.hasDeleteFlag) {
      if (!event.isNew) {
        this.deleteSkills.push(event.item_id);
      } else {
        this.newSkills = this.newSkills.filter(
          (skill) => skill.id !== event.item_id
        );
        this.newSkillsForms = this.newSkillsForms.filter(
          (form) => form.value.id !== event.item_id
        );
        this.newSkillsCount--;
      }
    }
  }

  onAddClick() {
    let newSkill: Skill = {
      id: 'new-' + this.newSkillsCount.toString(),
      name: '',
      level: 0,
      description: '',
      category: { id: 0, name: '', description: '', icon: '', color: '' },
      tags: [],
    };
    this.newSkills.push(newSkill);
    this.newSkillsCount++;
  }

  onSkillFormInit(event: FormGroup) {
    this.newSkillsForms.push(event);
  }
}
