import { Subject } from 'rxjs';
import { ActionDirective } from './action.directive';
import {
  FocusableOption,
  FocusKeyManager,
  FocusMonitor,
} from '@angular/cdk/a11y';
import { ResourceComponent } from './../resource.component';
import {
  Component,
  OnInit,
  QueryList,
  ViewChildren,
  AfterViewInit,
  HostListener,
} from '@angular/core';

@Component({
  selector: 'xa-contextual-actions',
  templateUrl: './contextual-actions.component.html',
  styleUrls: ['./contextual-actions.component.scss'],
})
export class ContextualActionsComponent
  implements OnInit, AfterViewInit, FocusableOption {
  @ViewChildren(ActionDirective) actions: QueryList<ActionDirective>;
  listManager: FocusKeyManager<ActionDirective>;

  constructor(public resourceComponent: ResourceComponent) {}

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this.listManager = new FocusKeyManager(this.actions)
      .withVerticalOrientation(false)
      .withHorizontalOrientation('ltr');
  }

  @HostListener('keydown', ['$event'])
  listenForKeyboard(event: KeyboardEvent): void {
    if (this.listManager) {
      this.listManager.onKeydown(event);
    }
  }

  focus(): void {
    this.listManager.setActiveItem(this.actions.first);
  }
}
