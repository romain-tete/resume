import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'xa-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  contactShown = false;

  constructor() {}

  ngOnInit(): void {}

  showContact() {
    this.contactShown = true;
  }
}
