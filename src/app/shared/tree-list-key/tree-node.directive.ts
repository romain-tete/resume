import { TreeEventsManagerDirective } from './tree-events-manager.directive';
import { FocusableOption } from '@angular/cdk/a11y';
import { TreeNode, TREE_NODE_INSTANCE } from './tree.types';
import {
  Directive,
  ElementRef,
  HostListener,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Renderer2,
  SkipSelf,
} from '@angular/core';

@Directive({
  selector: '[xaTreeNode]',
})
export class TreeNodeDirective implements TreeNode, OnInit, OnDestroy {
  level = 0;

  get children(): Iterable<TreeNode> {
    return this.nodeInstance.children;
  }

  constructor(
    @Inject(TREE_NODE_INSTANCE) public nodeInstance: TreeNode['nodeInstance'],
    @Optional() @SkipSelf() private parent: TreeNodeDirective,
    private eventsManager: TreeEventsManagerDirective,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  ngOnInit(): void {
    this.level = this.parent ? this.parent.level + 1 : 0;
    this.setLevelClass();
  }

  ngOnDestroy(): void {}

  @HostListener('click', ['$event'])
  click(event: MouseEvent): void {
    event.stopImmediatePropagation();
    this.eventsManager.setActiveItem(this.nodeInstance);
  }

  private setLevelClass(): void {
    this.renderer.addClass(
      this.el.nativeElement,
      `tree-node-level-${this.level}`
    );
  }
}
