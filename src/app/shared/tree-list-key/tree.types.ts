import { InjectionToken } from '@angular/core';

export interface TreeNode<T = any> {
  readonly children: Iterable<TreeNode>;
  nodeInstance: T;
}
export const TREE_ROOT = new InjectionToken('TREE_ROOT');
export const TREE_NODE_INSTANCE = new InjectionToken<TreeNode>(
  'TREE_NODE_INSTANCE'
);
