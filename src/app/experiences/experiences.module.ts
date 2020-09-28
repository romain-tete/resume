import { A11yModule } from '@angular/cdk/a11y';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ExperiencesStateModule } from '@xcedia/experiences';

import { SharedModule } from '../shared/shared.module';
import { TreeListKeyModule } from '../shared/tree/tree.module';
import { ContactModule } from './contact/contact.module';
import { ExperiencesRoutingModule } from './experiences-routing.module';
import { ExperiencesComponent } from './experiences.component';
import { ResourceListDirective } from './resource-list/resource-list.directive';
import { ContextualActionsModule } from './resource/contextual-actions/contextual-actions.module';
import { ContextFormComponent } from './resource/forms/context-form/context-form.component';
import { ImpactFormComponent } from './resource/forms/impact-form/impact-form.component';
import { ResourceFormDirective } from './resource/forms/resource-form.directive';
import { RoleFormComponent } from './resource/forms/role-form/role-form.component';
import { ExactHoverDirective } from './resource/resource-row/exact-hover.directive';
import { ResourceRowComponent } from './resource/resource-row/resource-row.component';
import { ResourceComponent } from './resource/resource.component';
import { ContextViewComponent } from './resource/views/context-view/context-view.component';
import { ImpactViewComponent } from './resource/views/impact-view/impact-view.component';
import { ResourceViewDirective } from './resource/views/resource-view.directive';
import { RoleViewComponent } from './resource/views/role-view/role-view.component';

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
    ResourceViewDirective,
    RoleViewComponent,
    ExactHoverDirective,
    ImpactViewComponent,
    ContextViewComponent,
  ],
  imports: [
    SharedModule,
    ExperiencesRoutingModule,
    ReactiveFormsModule,
    A11yModule,
    ContextualActionsModule,
    TreeListKeyModule,
    ContactModule,
    ExperiencesStateModule,
  ],
})
export class ExperiencesModule {}
