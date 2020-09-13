import { Context } from '@xcedia/experiences';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'xa-list-context-view',
  templateUrl: './list-contexts-view.component.html',
  styleUrls: ['./list-contexts-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListContextsViewComponent implements OnChanges {
  @Input() contexts: Context[];

  @Output() addNewContext = new EventEmitter<void>();
  @Output() saveContext = new EventEmitter<Context>();
  @Output() cancelEdition = new EventEmitter<Context>();

  canAddMore = true;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.contexts) {
      const last = this.contexts[this.contexts.length - 1];
      this.canAddMore = last && !!last.label;
    }
  }

  doAddNewContext(): void {
    this.addNewContext.emit();
  }

  doSave(context: Context): void {
    this.saveContext.emit(context);
  }

  doCancel(context: Context): void {
    this.cancelEdition.emit(context);
  }

  trackById(index, ctx): string {
    return ctx.id;
  }
}
