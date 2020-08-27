import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'xa-role-heading',
  templateUrl: './role-heading.component.html',
  styleUrls: ['./role-heading.component.scss'],
})
export class RoleHeadingComponent implements OnInit {
  @HostBinding('class') classes = 'd-block font-weight-bold';

  constructor() {}

  ngOnInit(): void {}
}
