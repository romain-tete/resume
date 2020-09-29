import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[xaInhibitArrows]',
})
export class InhibitArrowsDirective {
  constructor() {}

  @HostListener('keydown', ['$event'])
  inhibitArrows(event: KeyboardEvent): void {
    const arrowKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

    if (arrowKeys.includes(event.key)) {
      event.stopImmediatePropagation();
    }
  }
}
