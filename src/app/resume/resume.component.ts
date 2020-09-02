import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'xa-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss'],
})
export class ResumeComponent implements OnInit {
  contactShown = false;

  constructor() {}

  ngOnInit(): void {}

  showContact() {
    this.contactShown = true;
  }
}
