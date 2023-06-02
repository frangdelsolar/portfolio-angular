import { Component, Input, OnInit, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-tab-menu',
  templateUrl: './tab-menu.component.html',
  styleUrls: ['./tab-menu.component.scss'],
})
export class TabMenuComponent implements OnInit {
  @Input() items: MenuItem[];
  @Input() activeItem: MenuItem;
  @Input() scrollable: boolean = true;

  @Output() onActiveItemChange: MenuItem;

  constructor() {}

  ngOnInit(): void {}
}
