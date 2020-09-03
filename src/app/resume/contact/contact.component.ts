import { Component } from '@angular/core';

@Component({
  selector: 'xa-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  contactShown = false;

  constructor() {}

  showContact(): void {
    this.contactShown = true;
  }

  isOnline(): boolean {
    return window.location.hostname !== 'localhost';
  }
}
