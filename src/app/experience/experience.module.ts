import { RoleComponent } from './role/role.component';
import { ExperienceComponent } from './experience.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleHighlightComponent } from './role-highlight/role-highlight.component';
import { RoleHeadingComponent } from './role-heading/role-heading.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    ExperienceComponent,
    RoleComponent,
    RoleHighlightComponent,
    RoleHeadingComponent,
  ],
  exports: [ExperienceComponent, RoleComponent, RoleHighlightComponent],
})
export class ExperienceModule {}
