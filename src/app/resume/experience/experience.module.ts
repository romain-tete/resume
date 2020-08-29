import { RoleComponent } from './role/role.component';
import { ExperienceComponent } from './experience.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleHeadingDirective } from './role-heading/role-heading.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [ExperienceComponent, RoleComponent, RoleHeadingDirective],
  exports: [ExperienceComponent, RoleComponent, RoleHeadingDirective],
})
export class ExperienceModule {}
