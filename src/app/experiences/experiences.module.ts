import { NgModule } from '@angular/core';

import { ExperiencesRoutingModule } from './experiences-routing.module';
import { ExperiencesComponent } from './experiences.component';
import { SharedModule } from '../shared/shared.module';
import { ListContextsComponent } from './list-contexts/list-contexts.component';
import { ContextComponent } from './context/context.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ExperiencesComponent, ListContextsComponent, ContextComponent],
  imports: [SharedModule, ExperiencesRoutingModule, ReactiveFormsModule],
})
export class ExperiencesModule {}
