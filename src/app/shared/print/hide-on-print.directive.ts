import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[xaHideOnPrint]',
})
export class HideOnPrintDirective {
  @HostBinding('class') classes = 'hide-on-print';

  constructor() {}
}
