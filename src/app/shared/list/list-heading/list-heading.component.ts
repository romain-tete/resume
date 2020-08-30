import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'xa-list-heading',
  templateUrl: './list-heading.component.html',
  styleUrls: ['./list-heading.component.scss'],
})
export class ListHeadingComponent implements OnInit {
  @HostBinding('class') classes = "text-primary font-weight-bold"
  
  constructor() {}

  ngOnInit(): void {}
}
