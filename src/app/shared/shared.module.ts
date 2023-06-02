import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { MenubarModule } from 'primeng/menubar';
import { MessagesModule } from 'primeng/messages';
import { TabMenuModule } from 'primeng/tabmenu';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';

import { CardComponent } from './card/card.component';
import { DialogComponent } from './dialog/dialog.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

const uiComponents = [CardComponent, DialogComponent, ToolbarComponent];

const pngModules = [
  ButtonModule,
  CardModule,
  DynamicDialogModule,
  MenubarModule,
  MessagesModule,
  TabMenuModule,
  ToastModule,
  ToolbarModule,
];

@NgModule({
  declarations: [...uiComponents],
  imports: [CommonModule, ...pngModules],
  exports: [...uiComponents, ...pngModules],
})
export class SharedModule {}
