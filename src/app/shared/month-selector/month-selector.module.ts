import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonthSelectorComponent } from './month-selector.component';

@NgModule({
  declarations: [MonthSelectorComponent],
  exports: [MonthSelectorComponent],
  imports: [CommonModule, ReactiveFormsModule],
})
export class MonthSelectorModule {}
