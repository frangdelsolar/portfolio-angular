import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Skill } from '@app/core/models/skill.interface';

@Component({
  selector: 'app-skill-item',
  templateUrl: './skill-item.component.html',
  styleUrls: ['./skill-item.component.scss'],
})
export class SkillItemComponent implements OnInit {
  @Input() skill: Skill;
  @Input() editModeOn: boolean = false;

  @Output() formControlChange: EventEmitter<any> = new EventEmitter();

  form: FormGroup;
  idControl = new FormControl(null, [Validators.required]);
  nameControl = new FormControl(null, [Validators.required]);
  descriptionControl = new FormControl(null, [Validators.required]);
  levelControl = new FormControl(null, [Validators.required]);

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      id: this.idControl,
      name: this.nameControl,
      description: this.descriptionControl,
      level: this.levelControl,
    });
  }

  ngOnInit(): void {
    if (this.skill) {
      this.form.patchValue(this.skill);
    }
    this.update();
  }

  update() {
    this.formControlChange.emit(this.form);
  }
}
