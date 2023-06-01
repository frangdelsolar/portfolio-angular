import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';

import { CardComponent } from './card/card.component';

const uiComponents = [CardComponent];
const antdModules = [NzButtonModule, NzCardModule];

@NgModule({
  declarations: [...uiComponents],
  imports: [CommonModule, ...antdModules],
  exports: [...uiComponents, ...antdModules],
})
export class SharedModule {}
