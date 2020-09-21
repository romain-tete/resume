import { Inject, Injectable } from '@angular/core';
import { TreeRootComponent } from './tree-root.component';
import { TreeNode, TREE_ROOT } from './tree.types';

@Injectable()
export class TreeWalker {
  constructor(@Inject(TREE_ROOT) private root: TreeRootComponent) {}

  first(): TreeNode {
    return Array.from(this.root.children)[0] || null;
  }

  last(): TreeNode {
    return this.findLast();
  }

  next(from: TreeNode): TreeNode {
    const pathToCurrent = this.locate(from);
    return this.nextFromPath(pathToCurrent);
  }

  previous(from: TreeNode): TreeNode {
    const pathToCurrent = this.locate(from);
    return this.previousFromPath(pathToCurrent);
  }

  /**
   *
   * @param node The node to find
   * @param from Either the root or the current step in the walking
   *
   * @returns the path from the root to reach the targeted node
   */
  private locate(node: TreeNode, from: TreeNode = null): number[] {
    const start = from || this.root;
    const children = Array.from(start.children);

    if (this.root.identityFn(start) === this.root.identityFn(node)) {
      return [];
    } else if (children.length === 0) {
      return null;
    } else {
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        const subPath = this.locate(node, child);
        if (subPath) {
          return [i, ...subPath];
        }
      }

      return null;
    }
  }

  private findLast(from: TreeNode = null): TreeNode {
    const start = from || this.root;
    const children = Array.from(start.children);

    if (children.length === 0) {
      return from;
    } else {
      return this.findLast(children[children.length - 1]);
    }
  }

  private nextFromPath(path: number[]): TreeNode {
    const toChild = [...path, 0];
    const child = this.readPath(toChild);

    if (child) {
      return child;
    }

    const toNextSibling = [...path];
    toNextSibling.splice(path.length - 1, 1, path[path.length - 1] + 1);
    const nextSibling = this.readPath(toNextSibling);

    if (nextSibling) {
      return nextSibling;
    }

    const toNextUncle = path.slice(0, path.length - 1);
    toNextUncle.splice(
      toNextUncle.length - 1,
      1,
      toNextUncle[toNextUncle.length - 1] + 1
    );
    const nextUncle = this.readPath(toNextUncle);
    return nextUncle;
  }

  private previousFromPath(path: number[]): TreeNode {
    const previousSiblingPath = [...path];
    previousSiblingPath.splice(path.length - 1, 1, path[path.length - 1] - 1);
    const previousSibling = this.readPath(previousSiblingPath);

    if (previousSibling) {
      return this.findLast(previousSibling);
    }

    const parentPath = [...path.slice(0, path.length - 1)];
    const parent = this.readPath(parentPath);
    return parent === this.root ? null : parent;
  }

  private readPath(path: number[]): TreeNode {
    return path.reduce<TreeNode>((currentNode, index) => {
      const children = Array.from(currentNode.children);
      return children[index];
    }, this.root);
  }
}
