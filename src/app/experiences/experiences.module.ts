import { ContextualActionsModule } from './resource/contextual-actions/contextual-actions.module';
import { ResourceFormDirective } from './resource/forms/resource-form.directive';
import { ImpactFormComponent } from './resource/forms/impact-form/impact-form.component';
import { RoleFormComponent } from './resource/forms/role-form/role-form.component';
import { ContextFormComponent } from './resource/forms/context-form/context-form.component';
import { ResourceListComponent } from './resource-list/resource-list.component';
import { ResourceComponent } from './resource/resource.component';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { ExperiencesRoutingModule } from './experiences-routing.module';
import { ExperiencesComponent } from './experiences.component';

import { A11yModule } from '@angular/cdk/a11y';
import { ResourceRowComponent } from './resource/resource-row/resource-row.component';
import { ResourceListViewComponent } from './resource-list/resource-list-view.component';

@NgModule({
  declarations: [
    ExperiencesComponent,
    ResourceComponent,
    ResourceListComponent,
    ContextFormComponent,
    RoleFormComponent,
    ImpactFormComponent,
    ResourceFormDirective,
    ResourceRowComponent,
    ResourceListViewComponent,
  ],
  imports: [
    SharedModule,
    ExperiencesRoutingModule,
    ReactiveFormsModule,
    A11yModule,
    ContextualActionsModule,
  ],
})
export class ExperiencesModule {}
