import { ResourceListDirective } from './resource-list/resource-list.directive';
import { TreeListKeyModule } from '../shared/tree/tree-list-key.module';
import { ContextualActionsModule } from './resource/contextual-actions/contextual-actions.module';
import { ResourceFormDirective } from './resource/forms/resource-form.directive';
import { ImpactFormComponent } from './resource/forms/impact-form/impact-form.component';
import { RoleFormComponent } from './resource/forms/role-form/role-form.component';
import { ContextFormComponent } from './resource/forms/context-form/context-form.component';
import { ResourceComponent } from './resource/resource.component';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { ExperiencesRoutingModule } from './experiences-routing.module';
import { ExperiencesComponent } from './experiences.component';

import { A11yModule } from '@angular/cdk/a11y';
import { ResourceRowComponent } from './resource/resource-row/resource-row.component';

@NgModule({
  declarations: [
    ExperiencesComponent,
    ResourceComponent,
    ContextFormComponent,
    RoleFormComponent,
    ImpactFormComponent,
    ResourceFormDirective,
    ResourceRowComponent,
    ResourceListDirective,
  ],
  imports: [
    SharedModule,
    ExperiencesRoutingModule,
    ReactiveFormsModule,
    A11yModule,
    ContextualActionsModule,
    TreeListKeyModule,
  ],
})
export class ExperiencesModule {}
