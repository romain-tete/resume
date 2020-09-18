import { ContextualActionsComponent } from './contextual-actions.component';
import { ActionDirective } from './action.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ActionDirective, ContextualActionsComponent],
  imports: [CommonModule],
  exports: [ContextualActionsComponent],
})
export class ContextualActionsModule {}
