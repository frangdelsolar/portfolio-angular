import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SkillService } from '@app/core/controllers/skill.controller';
import { Skill } from '@app/core/models/skill.interface';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
})
export class SkillsComponent implements OnInit {
  editModeOn: boolean = false;
  form: FormGroup;

  skills: Skill[] = [];
  addSkills: Skill[] = [];
  deleteSkills: number[] = [];

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
      this.skillSvc
        .updateBulk({
          update: data,
          delete: this.deleteSkills,
          create: this.addSkills,
        })
        .subscribe((res) => {
          this.deleteSkills.forEach((id: number) => {
            let index = this.skills.findIndex(
              (skill) => skill.id == id.toString()
            );
            this.skills.splice(index, 1);
          });
        });
    }
  }

  onSkillFormChange(event: FormControl, i: number) {
    this.form.controls['skills'].value[i] = event;
  }

  onDeleteClick(id: any) {
    this.deleteSkills.push(id);
  }

  onAddClick() {}
}