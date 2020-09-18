import { ContextualActionsComponent } from './../contextual-actions/contextual-actions.component';
import { FocusableOption } from '@angular/cdk/a11y';
import { ResourceComponent } from './../resource.component';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ViewChildren,
  QueryList,
} from '@angular/core';

@Component({
  selector: 'xa-resource-row',
  templateUrl: './resource-row.component.html',
  styleUrls: ['./resource-row.component.scss'],
})
export class ResourceRowComponent implements OnInit, FocusableOption {
  @ViewChild(ContextualActionsComponent)
  contextualActions: ContextualActionsComponent;
  constructor(public resourceComponent: ResourceComponent) {}

  focus(): void {
    if (this.contextualActions) {
      this.contextualActions.focus();
    }
  }

  ngOnInit(): void {}
}
