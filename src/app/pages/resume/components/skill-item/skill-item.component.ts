import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Skill } from '@app/core/models/skill.interface';

export interface DeleteItem {
  isNew: boolean;
  hasDeleteFlag: boolean;
  item_id: any;
}

@Component({
  selector: 'app-skill-item',
  templateUrl: './skill-item.component.html',
  styleUrls: ['./skill-item.component.scss'],
})
export class SkillItemComponent implements OnInit {
  @Input() newSkill: boolean = false;
  @Input() skill: Skill;
  @Input() editModeOn: boolean = false;
  valueHasChanged: boolean = false;
  deleteFlag: boolean = false;
  @Output() formControlChange: EventEmitter<any> = new EventEmitter();
  @Output() deleteFlagChange: EventEmitter<DeleteItem> = new EventEmitter();

  @Output() onInit: EventEmitter<any> = new EventEmitter();

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
      this.onInit.emit(this.form);
    }
    this.update();
  }

  onDeleteClick() {
    this.deleteFlag = !this.deleteFlag;
    this.deleteFlagChange.emit({
      isNew: this.newSkill,
      hasDeleteFlag: this.deleteFlag,
      item_id: this.skill.id,
    });
  }

  update() {
    this.form.valueChanges.subscribe((res) => {
      this.valueHasChanged = true;
      this.formControlChange.emit({ isNew: this.newSkill, form: this.form });
    });
  }
}
