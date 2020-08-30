import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'xa-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
  host: {
    role: 'listitem',
  },
})
export class ListItemComponent implements OnInit {
  @HostBinding('class') classes = "mb-2";

  constructor() {}

  ngOnInit(): void {}
}
