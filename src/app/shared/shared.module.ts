import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardComponent } from './card/card.component';
import { MenubarModule } from 'primeng/menubar';
import { TabMenuModule } from 'primeng/tabmenu';
import { ToolbarComponent } from './toolbar/toolbar.component';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';

const uiComponents = [CardComponent, ToolbarComponent];
const pngModules = [
  ButtonModule,
  CardModule,
  MenubarModule,
  TabMenuModule,
  ToolbarModule,
];

@NgModule({
  declarations: [...uiComponents],
  imports: [CommonModule, ...pngModules],
  exports: [...uiComponents, ...pngModules],
})
export class SharedModule {}
