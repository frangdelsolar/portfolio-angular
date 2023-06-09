import { Component, Input, OnInit } from '@angular/core';
import { Work } from '@app/core/models/work.interface';

@Component({
  selector: 'app-work-preview',
  templateUrl: './work-preview.component.html',
  styleUrls: ['./work-preview.component.scss'],
})
export class WorkPreviewComponent implements OnInit {
  @Input() item: Work;

  constructor() {}

  ngOnInit(): void {}
}
