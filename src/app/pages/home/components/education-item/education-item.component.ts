import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-education-item',
  templateUrl: './education-item.component.html',
  styleUrls: ['./education-item.component.scss'],
})
export class EducationItemComponent implements OnInit {
  @Input() item: any;

  constructor() {}

  ngOnInit(): void {}

  get dates(): string {
    const startYear = new Date(this.item.start_date).getFullYear();
    if (!this.item.end_date) {
      return `${startYear} to Present`;
    }
    const endYear = new Date(this.item.end_date).getFullYear();
    return `${startYear} to ${endYear}`;
  }
}
