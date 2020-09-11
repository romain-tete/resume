import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'xa-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
})
export class PageHeaderComponent implements OnInit {
  @HostBinding('class') classes = 'd-block mb-5';
  constructor() {}

  ngOnInit(): void {}
}
