import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'xa-role-skill',
  templateUrl: './role-skill.component.html',
  styleUrls: ['./role-skill.component.scss'],
})
export class RoleSkillComponent implements OnInit {
  @Input() kind: 'primary' | 'secondary';

  constructor() {}

  ngOnInit(): void {}
}
