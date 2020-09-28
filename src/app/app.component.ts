import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'xa-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @HostBinding('class') classes = 'container';
  title = 'resume';
}
