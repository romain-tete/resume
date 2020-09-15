import { ReactiveFormsModule } from '@angular/forms';
import { RoleComponent } from './role/role.component';
import { RoleListComponent } from './role-list/role-list.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ImpactModule } from '../impact/impact.module';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, ImpactModule],
  exports: [RoleListComponent],
  declarations: [RoleComponent, RoleListComponent],
})
export class RoleModule {}
