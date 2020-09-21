import { FocusableOption } from '@angular/cdk/a11y';
import { TreeNode } from './tree.types';
import { Directive, HostBinding, HostListener } from '@angular/core';
import { TreeWalker } from './tree-walker.service';

@Directive({
  selector: '[xaTreeEventsManager]',
  providers: [TreeWalker],
})
export class TreeEventsManagerDirective {
  selected: TreeNode<FocusableOption> = null;

  @HostBinding('attr.tabindex') tabindex = 0;

  constructor(private walker: TreeWalker) {}

  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowDown') {
      this.setActiveItem(
        (this.selected === null
          ? this.walker.first()
          : this.walker.next(this.selected)) || this.walker.first()
      );
    }

    if (event.key === 'ArrowUp') {
      this.setActiveItem(
        (this.selected === null
          ? this.walker.last()
          : this.walker.previous(this.selected)) || this.walker.last()
      );
    }
    this.selected.nodeInstance.focus();
  }

  setActiveItem(item: TreeNode): void {
    this.selected = item;
  }
}
