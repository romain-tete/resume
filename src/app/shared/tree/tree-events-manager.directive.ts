import { Subject } from 'rxjs';
import { FocusableOption, FocusMonitor } from '@angular/cdk/a11y';
import { TreeNode } from './tree.types';
import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { NodeDescriptor, TreeWalker } from './tree-walker.service';
import { takeUntil, distinctUntilChanged, filter } from 'rxjs/operators';

@Directive({
  selector: '[xaTreeEventsManager]',
  providers: [TreeWalker],
})
export class TreeEventsManagerDirective implements OnInit, OnDestroy {
  selectedNode: TreeNode<FocusableOption> = null;
  selectedIndex: number = null;

  selectionChange = new Subject<void>();

  @HostBinding('attr.tabindex') tabindex = 0;

  private destroy$ = new Subject();

  constructor(
    private walker: TreeWalker,
    private fm: FocusMonitor,
    private el: ElementRef
  ) {}

  ngOnInit(): void {
    this.fm
      .monitor(this.el.nativeElement, true)
      .pipe(
        distinctUntilChanged(),
        filter((focused) => !focused),
        takeUntil(this.destroy$)
      )
      .subscribe(() => this.setActiveItem(null));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

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
    if (node === null) {
      this.selectedNode = null;
      this.selectedIndex = null;
      return;
    }

    if (node === this.selectedNode) {
      return;
    }

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
        const replacement = this.walker.previous(this.selectedNode);
        this._setActiveItem(replacement);
      });
  }
}
