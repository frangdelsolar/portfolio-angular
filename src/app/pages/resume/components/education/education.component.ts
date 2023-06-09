import { Component, OnInit } from '@angular/core';
import { EducationService } from '@app/core/controllers/education.controller';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss'],
})
export class EducationComponent implements OnInit {
  editModeOn: boolean = false;
  education: any;

  constructor(private educationSvc: EducationService) {}

  ngOnInit(): void {
    this.educationSvc.get().subscribe((data) => {
      this.education = data;
    });
  }

  onAddClick() {}
  onSaveClick() {}
}
