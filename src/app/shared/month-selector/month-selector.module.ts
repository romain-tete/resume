import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonthSelectorComponent } from './month-selector.component';
import { KeyboardModule } from '../keyboard/keyboard.module';

@NgModule({
  declarations: [MonthSelectorComponent],
  exports: [MonthSelectorComponent],
  imports: [CommonModule, ReactiveFormsModule, KeyboardModule],
})
export class MonthSelectorModule {}
