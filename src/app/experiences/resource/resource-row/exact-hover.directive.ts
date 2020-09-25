import {
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Output,
} from '@angular/core';

@Directive({
  selector: '[xaExactHover]',
  exportAs: 'exactHover',
})
export class ExactHoverDirective {
  @Output() hoverStart = new EventEmitter<void>();
  @Output() hoverEnd = new EventEmitter<void>();

  @HostBinding('class.xa-hovered') hovered = false;
  @HostBinding('class.xa-exact-hovered') exactHovered = false;

  constructor(private el: ElementRef<HTMLElement>) {}

  @HostListener('mouseenter', ['$event'])
  @HostListener('mouseleave', ['$event'])
  onHover(event: MouseEvent): void {
    if (event.type === 'mouseenter') {
      this.hovered = true;
      this.checkChildren();
    } else if (event.type === 'mouseleave') {
      this.hovered = false;
      if (this.exactHovered === true) {
        this.exactHovered = false;
        this.hoverEnd.emit();
      }
    }
  }

  checkChildren(): void {
    const hasDescendantHovered = this.el.nativeElement.querySelector(
      '.xa-hovered'
    );

    if (!hasDescendantHovered && !this.exactHovered) {
      this.exactHovered = true;
      this.hoverStart.emit();
    }
  }
}
