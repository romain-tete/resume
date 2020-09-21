import { TreeNodeDirective } from './tree-node.directive';
import { TREE_ROOT, TreeNode } from './tree.types';
import {
  Component,
  forwardRef,
  QueryList,
  ContentChildren,
  Input,
} from '@angular/core';

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
export class TreeRootComponent implements TreeNode {
  @ContentChildren(TreeNodeDirective) children: QueryList<TreeNode>;
  nodeInstance = null;

  @Input() identityFn: (node: TreeNode) => any = (node) => node;
}
