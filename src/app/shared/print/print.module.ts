import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HideOnPrintDirective } from './hide-on-print.directive';

@NgModule({
  declarations: [HideOnPrintDirective],
  exports: [HideOnPrintDirective],
  imports: [CommonModule],
})
export class PrintModule {}
