import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { DividerModule } from 'primeng/divider';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { KnobModule } from 'primeng/knob';
import { MenubarModule } from 'primeng/menubar';
import { MessagesModule } from 'primeng/messages';
import { PanelModule } from 'primeng/panel';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { TabMenuModule } from 'primeng/tabmenu';
import { TabViewModule } from 'primeng/tabview';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';

import { CardComponent } from './card/card.component';
import { DialogComponent } from './dialog/dialog.component';
import { EditActionsComponent } from './edit-actions/edit-actions.component';
import { InputEditorComponent } from './input-editor/input-editor.component';
import { InputTextComponent } from './input-text/input-text.component';
import { TabMenuComponent } from './tab-menu/tab-menu.component';
import { TagComponent } from './tag/tag.component';
import { ToastComponent } from './toast/toast.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

const pngModules = [
  ButtonModule,
  CardModule,
  CKEditorModule,
  DividerModule,
  DynamicDialogModule,
  FormsModule,
  InputTextareaModule,
  InputTextModule,
  KnobModule,
  MenubarModule,
  MessagesModule,
  PanelModule,
  PasswordModule,
  ReactiveFormsModule,
  RippleModule,
  TabMenuModule,
  TabViewModule,
  TagModule,
  ToastModule,
  ToolbarModule,
];

const uiComponents = [
  CardComponent,
  DialogComponent,
  EditActionsComponent,
  InputEditorComponent,
  InputTextComponent,
  TabMenuComponent,
  TagComponent,
  ToastComponent,
  ToolbarComponent,
];

@NgModule({
  declarations: [...uiComponents],
  imports: [CommonModule, ...pngModules],
  exports: [...uiComponents, ...pngModules],
})
export class SharedModule {}
