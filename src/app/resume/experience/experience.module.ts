import { RoleComponent } from './role/role.component';
import { ExperienceComponent } from './experience.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleHeadingDirective } from './role-heading/role-heading.directive';
import { RoleSkillsComponent } from './role-skills/role-skills.component';
import { RoleSkillComponent } from './role-skill/role-skill.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    ExperienceComponent,
    RoleComponent,
    RoleHeadingDirective,
    RoleSkillsComponent,
    RoleSkillComponent,
  ],
  exports: [
    ExperienceComponent,
    RoleComponent,
    RoleHeadingDirective,
    RoleSkillsComponent,
    RoleSkillComponent,
  ],
})
export class ExperienceModule {}
