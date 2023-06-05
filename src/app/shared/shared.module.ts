import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { MessagesModule } from 'primeng/messages';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { TabMenuModule } from 'primeng/tabmenu';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';

import { CardComponent } from './card/card.component';
import { DialogComponent } from './dialog/dialog.component';
import { EditActionsComponent } from './edit-actions/edit-actions.component';
import { InputTextComponent } from './input-text/input-text.component';
import { TabMenuComponent } from './tab-menu/tab-menu.component';
import { ToastComponent } from './toast/toast.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

const pngModules = [
  ButtonModule,
  CardModule,
  DividerModule,
  DynamicDialogModule,
  FormsModule,
  InputTextareaModule,
  InputTextModule,
  MenubarModule,
  MessagesModule,
  PasswordModule,
  ReactiveFormsModule,
  RippleModule,
  TabMenuModule,
  TabViewModule,
  ToastModule,
  ToolbarModule,
];

const uiComponents = [
  CardComponent,
  DialogComponent,
  EditActionsComponent,
  InputTextComponent,
  TabMenuComponent,
  ToastComponent,
  ToolbarComponent,
];

@NgModule({
  declarations: [...uiComponents],
  imports: [CommonModule, ...pngModules],
  exports: [...uiComponents, ...pngModules],
})
export class SharedModule {}
