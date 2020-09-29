import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InhibitArrowsDirective } from './inhibit-arrows.directive';

@NgModule({
  declarations: [InhibitArrowsDirective],
  exports: [InhibitArrowsDirective],
  imports: [CommonModule],
})
export class KeyboardModule {}
