import { TreeNodeDirective } from './tree-node.directive';
import { TREE_ROOT, TreeNode } from './tree.types';
import {
  Component,
  forwardRef,
  QueryList,
  ContentChildren,
  OnDestroy,
} from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'xa-tree-root',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: TREE_ROOT,
      useExisting: forwardRef(() => TreeRootComponent),
    },
  ],
})
export class TreeRootComponent implements TreeNode, OnDestroy {
  @ContentChildren(TreeNodeDirective) children: QueryList<TreeNode>;
  nodeInstance = null;
  destroy$ = new Subject<void>();

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
