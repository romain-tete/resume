import { TreeEventsManagerDirective } from './tree-events-manager.directive';
import { TreeNode, TREE_NODE_INSTANCE } from './tree.types';
import {
  Directive,
  ElementRef,
  Host,
  Inject,
  OnDestroy,
  OnInit,
  Optional,
  Renderer2,
  SkipSelf,
} from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { FocusMonitor } from '@angular/cdk/a11y';
import { distinctUntilChanged, filter, map, takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[xaTreeNode]',
})
export class TreeNodeDirective implements TreeNode, OnInit, OnDestroy {
  level = 0;
  initialized = false;
  destroy$ = new Subject<void>();

  exactFocus$ = new ReplaySubject<boolean>(1);

  get children(): Iterable<TreeNode> {
    return this.nodeInstance.children;
  }

  constructor(
    @Inject(TREE_NODE_INSTANCE) public nodeInstance: any,
    @Optional() @SkipSelf() private parent: TreeNodeDirective,
    private eventsManager: TreeEventsManagerDirective,
    private renderer: Renderer2,
    private el: ElementRef<HTMLElement>,
    private focusMonitor: FocusMonitor
  ) {}

  ngOnInit(): void {
    this.level = this.parent ? this.parent.level + 1 : 0;
    this.initialized = true;
    this.setLevelClass();

    this.focusMonitor
      .monitor(this.el, true)
      .pipe(takeUntil(this.destroy$))
      .subscribe((focusType) => {
        // This is needed to prevent bubbling up the tree
        // when going up to a leaf (the entire subtree gains a 'focused'
        // status due to watching children focus too)

        if (!!focusType) {
          const focusedChild = this.el.nativeElement.querySelector(
            '.cdk-focused'
          );
          if (!focusedChild) {
            this.eventsManager.setActiveItem(this.nodeInstance);
            this.exactFocus$.next(true);
          } else {
            this.exactFocus$.next(false);
          }
        } else {
          this.exactFocus$.next(false);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  private setLevelClass(): void {
    // OnInit is not guaranteed to have run on parent yet.
    // When not, the wrong level is computed.
    this.parent?.setLevelClass();
    this.level = this.parent ? this.parent.level + 1 : 0;

    this.renderer.addClass(
      this.el.nativeElement,
      `tree-node-level-${this.level}`
    );
  }
}
