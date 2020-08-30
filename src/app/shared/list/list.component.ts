import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'xa-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  host: {
    role: 'list',
  },
})
export class ListComponent implements OnInit {
  @HostBinding('class') classes = "mb-3";

  constructor() {}

  ngOnInit(): void {}
}
