import { FocusableOption } from '@angular/cdk/a11y';
import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: 'button',
})
export class ActionDirective implements FocusableOption {
  constructor(private el: ElementRef<HTMLButtonElement>) {}

  focus(): void {
    this.el.nativeElement.focus();
  }
}
