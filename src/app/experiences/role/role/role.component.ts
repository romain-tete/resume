import { Role } from '@xcedia/experiences';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'xa-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss'],
})
export class RoleComponent implements OnInit {
  @Input() role: Role;

  constructor() {}

  ngOnInit(): void {}
}
