import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'xa-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent implements OnInit {
  @HostBinding('attr.role') role = 'listitem';
  @HostBinding('class') classes = 'mb-2';

  constructor() {}

  ngOnInit(): void {}
}
