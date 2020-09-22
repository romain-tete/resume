import { takeUntil } from 'rxjs/operators';
import { TreeNodeDirective } from './../../../shared/tree/tree-node.directive';
import { ContextualActionsComponent } from './../contextual-actions/contextual-actions.component';
import { FocusableOption } from '@angular/cdk/a11y';
import { ResourceComponent } from './../resource.component';
import {
  ChangeDetectorRef,
  Component,
  HostBinding,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'xa-resource-row',
  templateUrl: './resource-row.component.html',
  styleUrls: ['./resource-row.component.scss'],
})
export class ResourceRowComponent
  implements OnInit, OnDestroy, FocusableOption {
  @ViewChild(ContextualActionsComponent)
  contextualActions: ContextualActionsComponent;

  shouldShowActions = false;

  private destroy$ = new Subject<void>();
  constructor(
    public resourceComponent: ResourceComponent,
    private treeNode: TreeNodeDirective,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.treeNode.exactFocus$
      .pipe(takeUntil(this.destroy$))
      .subscribe((focused) => {
        this.shouldShowActions = focused;
        this.cd.detectChanges();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  focus(): void {
    if (this.contextualActions) {
      this.contextualActions.focus();
    }
  }
}
