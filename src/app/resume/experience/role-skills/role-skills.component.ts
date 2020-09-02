import { RoleSkillComponent } from './../role-skill/role-skill.component';
import {
  Component,
  OnInit,
  ContentChildren,
  QueryList,
  AfterContentInit,
} from '@angular/core';

@Component({
  selector: 'xa-role-skills',
  templateUrl: './role-skills.component.html',
  styleUrls: ['./role-skills.component.scss'],
})
export class RoleSkillsComponent implements AfterContentInit {
  @ContentChildren(RoleSkillComponent) skills: QueryList<RoleSkillComponent>;
  hasSecondarySkills = false;

  constructor() {}

  ngAfterContentInit(): void {
    this.hasSecondarySkills = this.skills.reduce<boolean>(
      (hasSecondary, skill) => hasSecondary || skill.kind === 'secondary',
      false
    );
  }
}
