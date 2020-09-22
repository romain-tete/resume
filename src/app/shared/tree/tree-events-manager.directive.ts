import { Subject } from 'rxjs';
import { FocusableOption } from '@angular/cdk/a11y';
import { TreeNode } from './tree.types';
import { Directive, HostBinding, HostListener } from '@angular/core';
import { NodeDescriptor, TreeWalker } from './tree-walker.service';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[xaTreeEventsManager]',
  providers: [TreeWalker],
})
export class TreeEventsManagerDirective {
  selectedNode: TreeNode<FocusableOption> = null;
  selectedIndex: number;

  selectionChange = new Subject<void>();

  @HostBinding('attr.tabindex') tabindex = 0;

  constructor(private walker: TreeWalker) {}

  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowDown') {
      this.setNextItemActive();
    }

    if (event.key === 'ArrowUp') {
      this.setPreviousItemActive();
    }
  }

  setNextItemActive(): void {
    this._setActiveItem(
      this.selectedNode === null
        ? this.walker.first()
        : this.walker.next(this.selectedNode)
    );
  }

  setPreviousItemActive(): void {
    this._setActiveItem(
      this.selectedNode === null
        ? this.walker.last()
        : this.walker.previous(this.selectedNode)
    );
  }

  setActiveItem(node: TreeNode): void {
    const desc = this.walker.find(node);
    this._setActiveItem(desc);
  }

  private _setActiveItem({ node, index }: NodeDescriptor): void {
    this.selectionChange.next();

    this.selectedNode = node;
    this.selectedIndex = index;
    this.selectedNode.nodeInstance.focus();

    this.selectedNode.destroy$
      .pipe(takeUntil(this.selectionChange))
      .subscribe(() => {
        const replacement = this.walker.previous(this.selectedNode, false);
        this._setActiveItem(replacement);
      });
  }
}
