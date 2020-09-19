import { FocusableOption, FocusKeyManager } from '@angular/cdk/a11y';
import {
  AfterContentInit,
  Component,
  ContentChildren,
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Inject,
  InjectionToken,
  NgModule,
  OnInit,
  Optional,
  QueryList,
  Renderer2,
  SkipSelf,
  ViewChildren,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Tree {
  nodes: QueryList<TreeNode>;
  hasNext: () => boolean;
  hasPrevious: () => boolean;
  focusNextLeaf: () => void;
  focusPrevious: () => void;
  focusNode: (node: TreeNode) => void;
  focusFirst: () => void;
  focusLast: () => void;
}

export interface TreeNode extends FocusableOption {
  readonly subTree: Tree;
}

export const TREE_NODE_INSTANCE = new InjectionToken<TreeNode>(
  'TREE_NODE_INSTANCE'
);

@Directive({
  selector: '[xaTreeNode]',
})
export class TreeNodeDirective implements TreeNode, OnInit {
  get subTree(): Tree {
    return this.nodeInstance.subTree;
  }

  constructor(@Inject(TREE_NODE_INSTANCE) private nodeInstance: TreeNode) {}

  ngOnInit(): void {}

  focus(): void {
    this.nodeInstance.focus();
  }
}

@Component({
  selector: 'xa-tree',
  template: '<ng-content></ng-content>',
})
export class TreeComponent implements Tree, OnInit, AfterContentInit {
  @ContentChildren(TreeNodeDirective) nodes: QueryList<TreeNode>;
  private listKeyManager: FocusKeyManager<TreeNode>;

  @HostBinding('attr.tabindex') tabindex = -1;

  level = 0;

  constructor(
    @Optional() private parentNode: TreeNodeDirective,
    @Optional() @SkipSelf() private parentTree: TreeComponent,
    private el: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    if (!this.parentTree) {
      this.tabindex = 0;
    }

    if (this.parentTree) {
      this.level = this.parentTree.level + 1;
    }

    this.setLevelClass();
  }

  ngAfterContentInit(): void {
    console.log(this.nodes);
    this.listKeyManager = new FocusKeyManager(this.nodes).withWrap();
  }

  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (['ArrowUp', 'ArrowDown', 'Tab'].includes(event.key)) {
      event.stopImmediatePropagation();
    }

    switch (event.key) {
      case 'ArrowUp':
        this.focusPrevious();
        return;
      case 'ArrowDown':
        this.focusNextLeaf();
        return;
    }
  }

  hasNext(): boolean {
    return this.listKeyManager.activeItem !== this.nodes.last;
  }

  focusNextLeaf(): void {
    if (
      this.listKeyManager.activeItem.subTree &&
      this.listKeyManager.activeItem.subTree.nodes.length > 0
    ) {
      this.listKeyManager.activeItem.subTree.focusFirst();
    } else if (this.hasNext()) {
      this.listKeyManager.setNextItemActive();
    } else {
      this.parentTree.focusNode(this.parentNode);
      this.parentTree.focusNext();
    }
  }

  focusNext(): void {
    this.listKeyManager.setNextItemActive();
  }

  hasPrevious(): boolean {
    return this.listKeyManager.activeItem !== this.nodes.first;
  }

  focusPrevious(): void {
    if (this.hasPrevious()) {
      this.listKeyManager.setPreviousItemActive();
      if (this.listKeyManager.activeItem.subTree) {
        this.listKeyManager.activeItem.subTree.focusLast();
      }
    } else if (this.parentTree) {
      this.parentTree.focusNode(this.parentNode);
      this.parentTree.focusPrevious();
    }
  }

  focusNode(node: TreeNode): void {
    this.listKeyManager.setActiveItem(node);
  }

  @HostListener('focus')
  focusFirst(): void {
    this.listKeyManager.setActiveItem(this.nodes.first);
  }

  focusLast(): void {
    this.listKeyManager.setActiveItem(this.nodes.last);
  }

  private setLevelClass(): void {
    this.renderer.addClass(
      this.el.nativeElement,
      `tree-node-level-${this.level}`
    );
  }
}

@NgModule({
  declarations: [TreeComponent, TreeNodeDirective],
  imports: [CommonModule],
  exports: [TreeComponent, TreeNodeDirective],
})
export class TreeListKeyModule {}
