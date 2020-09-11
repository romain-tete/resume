import { PageTitleComponent } from './page-title.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [PageTitleComponent],
  exports: [PageTitleComponent],
  imports: [CommonModule],
})
export class PageTitleModule {}
