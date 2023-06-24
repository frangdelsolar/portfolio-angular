import { Component, OnInit } from '@angular/core';
import { ExperienceService } from '@app/core/controllers/experience.controller';
import { AppDialogService } from '@app/core/services/app-dialog.service';
import { ExperienceFormComponent } from '../experience-form/experience-form.component';

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

  constructor(
    private experienceSvc: ExperienceService,
    private dialogSvc: AppDialogService
  ) {}

  ngOnInit(): void {
    this.experienceSvc.get().subscribe((data: any) => {
      this.categorizeExperience(data);
    });
  }

  categorizeExperience(data: any) {
    this.categories = [];
    this.categoryNames = [];
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
  }

  onAddClick() {
    this.dialogSvc.show({
      component: ExperienceFormComponent,
      params: {
        header: 'Add Work Experience',
        width: '50%',
        contentStyle: { overflow: 'auto' },
        baseZIndex: 10000,
        maximizable: true,
      },
    });
    this.dialogSvc.DialogShowObservable.subscribe((res) => {
      if (res === false) {
        window.location.reload();
      }
    });
  }

  onSaveClick() {}
}
