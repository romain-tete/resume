import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'xa-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @HostBinding('attr.role') role = 'list';
  @HostBinding('class') classes = 'mb-3';

  constructor() {}

  ngOnInit(): void {}
}
