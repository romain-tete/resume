import { ResourceListComponent } from './resource-list/resource-list.component';
import { ResourceComponent } from './resource/resource.component';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { ExperiencesRoutingModule } from './experiences-routing.module';
import { ExperiencesComponent } from './experiences.component';
import { ResourceActionsComponent } from './forms/resource-actions/resource-actions.component';
import { ResourceFormFactoryDirective } from './forms/resource-form-factory.directive';
import { ContextFormComponent } from './forms/context-form/context-form.component';
import { RoleFormComponent } from './forms/role-form/role-form.component';
import { ImpactFormComponent } from './forms/impact-form/impact-form.component';

@NgModule({
  declarations: [
    ExperiencesComponent,
    ResourceComponent,
    ResourceListComponent,
    ContextFormComponent,
    RoleFormComponent,
    ImpactFormComponent,
    ResourceActionsComponent,
    ResourceFormFactoryDirective,
  ],
  imports: [SharedModule, ExperiencesRoutingModule, ReactiveFormsModule],
})
export class ExperiencesModule {}
