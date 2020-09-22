import { Inject, Injectable } from '@angular/core';
import {
  TreeNode,
  TREE_ROOT,
  NODE_IDENTITY_FN,
  NodeIdentityFn,
} from './tree.types';

export interface NodeDescriptor {
  node: TreeNode;
  index: number;
}

@Injectable()
export class TreeWalker {
  constructor(
    @Inject(TREE_ROOT) private root: TreeNode,
    @Inject(NODE_IDENTITY_FN) private identityFn: NodeIdentityFn = (n) => n
  ) {}

  get items(): TreeNode[] {
    return this._getItems();
  }

  first(): NodeDescriptor {
    return {
      node: this.items[0],
      index: 0,
    };
  }

  last(): NodeDescriptor {
    const items = this.items;
    const index = items.length - 1;

    return {
      node: items[index],
      index,
    };
  }

  next(from: TreeNode, wrap = true): NodeDescriptor {
    const items = this.items;
    const index = this.getItemIndex(from);
    let nextIndex = index + 1;

    if (nextIndex === items.length) {
      if (wrap) {
        nextIndex = 0;
      } else {
        return null;
      }
    }

    return {
      node: this.findByIndex(nextIndex),
      index: nextIndex,
    };
  }

  previous(from: TreeNode, wrap = true): NodeDescriptor {
    const items = this.items;
    const index = this.getItemIndex(from);
    let prevIndex = index - 1;

    if (prevIndex === -1) {
      if (wrap) {
        prevIndex = items.length - 1;
      } else {
        return null;
      }
    }

    return {
      node: this.findByIndex(prevIndex),
      index: prevIndex,
    };
  }

  findByIndex(index: number): TreeNode {
    return this.items[index];
  }

  find(node: TreeNode): NodeDescriptor {
    const index = this.getItemIndex(node);
    return {
      node,
      index,
    };
  }

  private _getItems(): TreeNode[] {
    const rootNodes = Array.from(this.root.children);
    const items = [...rootNodes];
    let cursor = 0;

    while (cursor < items.length) {
      const current = items[cursor];
      const children = Array.from(current.children);
      items.splice(cursor + 1, 0, ...children);
      cursor++;
    }
    return items;
  }

  private getItemIndex(node: TreeNode): number {
    return this.items
      .map((n) => this.identityFn(n))
      .indexOf(this.identityFn(node));
  }
}
