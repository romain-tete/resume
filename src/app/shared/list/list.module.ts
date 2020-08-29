import { ListComponent } from './list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListHeadingComponent } from './list-heading/list-heading.component';
import { ListItemComponent } from './list-item/list-item.component';

@NgModule({
  declarations: [ListComponent, ListHeadingComponent, ListItemComponent],
  exports: [ListComponent, ListHeadingComponent, ListItemComponent],
  imports: [CommonModule],
})
export class ListModule {}
