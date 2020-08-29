import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'xa-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionsComponent implements OnInit {
  ngOnInit(): void {}

  isLocale(locale): boolean {
    return !!window.location.pathname.match(`^/${locale}/*`);
  }
}
