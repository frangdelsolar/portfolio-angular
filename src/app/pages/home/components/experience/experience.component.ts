import { Component, OnInit } from '@angular/core';
import { ExperienceService } from '@app/core/controllers/experience.controller';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
})
export class ExperienceComponent implements OnInit {
  editModeOn: boolean = false;
  categories: any[] = [];
  categoryNames: string[] = [];

  activeIndex: number = 0;

  constructor(private experienceSvc: ExperienceService) {}

  ngOnInit(): void {
    this.experienceSvc.get().subscribe((data: any) => {
      data.forEach((item: any) => {
        let categoryName = item.category.name;
        if (!this.categoryNames.includes(categoryName)) {
          this.categoryNames.push(categoryName);
        }
      });

      this.categoryNames.forEach((categoryName) => {
        let category = {
          key: categoryName,
          label: categoryName,
          experiences: [null],
        };
        let experiences: any[] = data.filter(
          (item: any) => item.category.name === categoryName
        );
        category.experiences = experiences;
        this.categories.push(category);
      });
    });
  }

  onAddClick() {}
  onSaveClick() {}
}
