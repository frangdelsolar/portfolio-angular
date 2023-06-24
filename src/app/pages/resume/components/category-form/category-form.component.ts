import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CategoryService } from '@app/core/controllers/category.controller';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent implements OnInit {
  form: FormGroup;
  categoryNameControl: FormControl = new FormControl('', [Validators.required]);
  categoryDescriptionControl: FormControl = new FormControl('', [
    Validators.required,
  ]);
  @Output() onSave: EventEmitter<any> = new EventEmitter<any>();

  constructor(private fb: FormBuilder, private categorySvc: CategoryService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: this.categoryNameControl,
      description: this.categoryDescriptionControl,
    });
  }

  onSaveClick() {
    if (this.form.valid) {
      this.categorySvc.create(this.form.value).subscribe((response: any) => {
        if (response) {
          this.form.patchValue(response);
          this.onSave.emit(response);
        }
      });
    }
  }
}
