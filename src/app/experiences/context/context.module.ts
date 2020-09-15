import { ReactiveFormsModule } from '@angular/forms';
import { ContextComponent } from './context/context.component';
import { ContextListViewComponent } from './context-list-view/context-list-view.component';
import { ContextListComponent } from './context-list/context-list.component';
import { RoleModule } from './../role/role.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    ContextComponent,
    ContextListComponent,
    ContextListViewComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, RoleModule],
  exports: [ContextListComponent],
})
export class ContextModule {}
