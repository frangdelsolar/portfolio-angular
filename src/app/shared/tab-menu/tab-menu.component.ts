import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-tab-menu',
  templateUrl: './tab-menu.component.html',
  styleUrls: ['./tab-menu.component.scss'],
})
export class TabMenuComponent implements OnInit {
  @Input() items: MenuItem[];

  activeItem: MenuItem;

  ngOnInit() {
    if (this.items.length > 0) {
      this.activeItem = this.items[0];
    }
  }

  onActiveItemChange(event: any) {
    console.log(event);
    this.activeItem = event;
  }

  activateLast() {
    this.activeItem = this.items[this.items.length - 1];
  }
}
