import { ActionsModule } from './actions/actions.module';
import { ListModule } from './list/list.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [ListModule, ActionsModule],
})
export class SharedModule {}
