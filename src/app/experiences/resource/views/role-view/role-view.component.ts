import { ResourceViewComponent } from './../resource-view.component';
import { Component, Input, OnInit } from '@angular/core';
import { Role } from '@xcedia/experiences';

@Component({
  selector: 'xa-role-view',
  templateUrl: './role-view.component.html',
  styleUrls: ['./role-view.component.scss'],
  // tslint:disable-next-line: no-inputs-metadata-property
  inputs: ['resource'],
})
export class RoleViewComponent extends ResourceViewComponent implements OnInit {
  resource: Role;

  constructor() {
    super();
  }

  ngOnInit(): void {}
}
