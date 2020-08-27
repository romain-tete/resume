import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'xa-role-highlight',
  templateUrl: './role-highlight.component.html',
  styleUrls: ['./role-highlight.component.scss'],
})
export class RoleHighlightComponent implements OnInit {
  @HostBinding('class') classes = '';

  constructor() {}

  ngOnInit(): void {}
}
