import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CategoryService } from '@app/core/controllers/category.controller';
import { Category } from '@app/core/models/category.interface';
import { ToastService } from '@app/core/services/toast.service';

@Component({
  selector: 'app-category-dropdown',
  templateUrl: './category-dropdown.component.html',
  styleUrls: ['./category-dropdown.component.scss'],
})
export class CategoryDropdownComponent implements OnInit {
  @Input() items: any[] = [];
  @Input() control: FormControl = new FormControl('', []);

  categories: any[];
  addCategoryModeOn: boolean = false;

  constructor(
    private categorySvc: CategoryService,
    private toastSvc: ToastService
  ) {}

  ngOnInit(): void {
    this.categorySvc.get().subscribe((res: any) => {
      this.categories = res;
      this.categories.forEach((category) => {
        this.items.push({
          id: category.id,
          name: category.name,
        });
      });

      const selected = this.items.filter(
        (item) => item.id === this.control.value.id
      )[0];
      this.control.setValue(selected);
    });
  }

  onAddCategoryClick() {
    this.addCategoryModeOn = !this.addCategoryModeOn;
  }

  onAddCategorySave(category: Category) {
    this.items.push({
      id: category.id,
      name: category.name,
    });
    this.addCategoryModeOn = false;
    this.toastSvc.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Category added successfully',
    });
  }
}
