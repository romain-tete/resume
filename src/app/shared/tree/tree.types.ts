import { Observable } from 'rxjs';
import { InjectionToken } from '@angular/core';

export type NodeIdentityFn = (node: TreeNode) => any;

export interface TreeNode<T = any> {
  readonly children: Iterable<TreeNode>;
  nodeInstance: T;
  destroy$: Observable<void>;
}
export const TREE_ROOT = new InjectionToken('TREE_ROOT');
export const TREE_NODE_INSTANCE = new InjectionToken<TreeNode>(
  'TREE_NODE_INSTANCE'
);
export const NODE_IDENTITY_FN = new InjectionToken<NodeIdentityFn>(
  'NODE_IDENTITY_FN'
);
