import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-experience-item',
  templateUrl: './experience-item.component.html',
  styleUrls: ['./experience-item.component.scss'],
})
export class ExperienceItemComponent implements OnInit {
  @Input() experience: any;
  constructor() {}

  ngOnInit(): void {}

  get dates(): string {
    const startYear = new Date(this.experience.start_date).getFullYear();
    if (!this.experience.end_date) {
      return `${startYear} to Present`;
    }
    const endYear = new Date(this.experience.end_date).getFullYear();
    return `${startYear} to ${endYear}`;
  }

  getIcon(icon: string): any {
    if (!icon) {
      return null;
    }
    icon = `pi ${icon.replace('fa', 'pi')}`;
    return icon;
  }

  get tagControl() {
    const tags = this.experience.tags.map((tag: any) => tag.name);

    return new FormControl(tags, []);
  }
}
