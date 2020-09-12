import { Context } from '@xcedia/experiences';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'xa-list-context-view',
  templateUrl: './list-contexts-view.component.html',
  styleUrls: ['./list-contexts-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListContextsViewComponent {
  @Input() contexts: Context[];

  @Output() addNewContext = new EventEmitter<void>();
  @Output() saveContext = new EventEmitter<Context>();

  doAddNewContext(): void {
    this.addNewContext.emit();
  }
}
