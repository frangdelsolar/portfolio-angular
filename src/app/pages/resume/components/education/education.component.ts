import { Component, OnInit } from '@angular/core';
import { EducationService } from '@app/core/controllers/education.controller';
import { AppDialogService } from '@app/core/services/app-dialog.service';
import { EducationFormComponent } from '../education-form/education-form.component';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss'],
})
export class EducationComponent implements OnInit {
  editModeOn: boolean = false;
  education: any;

  constructor(
    private educationSvc: EducationService,
    private dialogSvc: AppDialogService
  ) {}

  ngOnInit(): void {
    this.educationSvc.get().subscribe((data) => {
      this.education = data;
    });
  }
  onAddClick() {
    this.dialogSvc.show({
      component: EducationFormComponent,
      params: {
        header: 'Add Academic Background',
        width: '50%',
        contentStyle: { overflow: 'auto' },
        baseZIndex: 10000,
        maximizable: true,
      },
    });
    this.dialogSvc.DialogShowObservable.subscribe((dialogVisible) => {
      if (!dialogVisible) {
        this.ngOnInit();
      }
    });
  }

  onSaveClick() {}
}
