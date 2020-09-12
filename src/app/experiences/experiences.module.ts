import { ListContextsViewComponent } from './list-contexts/list-contexts-view.component';
import { ListContextsComponent } from './list-contexts/list-contexts.component';
import { NgModule } from '@angular/core';

import { ExperiencesRoutingModule } from './experiences-routing.module';
import { ExperiencesComponent } from './experiences.component';
import { SharedModule } from '../shared/shared.module';
import { ContextComponent } from './context/context.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ListRolesComponent } from './list-roles/list-roles.component';
import { ListImpactsComponent } from './list-impacts/list-impacts.component';
import { RoleComponent } from './role/role.component';
import { ImpactComponent } from './impact/impact.component';

@NgModule({
  declarations: [
    ExperiencesComponent,
    ContextComponent,
    ListRolesComponent,
    ListImpactsComponent,
    RoleComponent,
    ImpactComponent,
    ListContextsComponent,
    ListContextsViewComponent,
  ],
  imports: [SharedModule, ExperiencesRoutingModule, ReactiveFormsModule],
})
export class ExperiencesModule {}
