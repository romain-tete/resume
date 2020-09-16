import { ResourceListComponent } from './resource-list/resource-list.component';
import { ResourceComponent } from './resource/resource.component';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { ExperiencesRoutingModule } from './experiences-routing.module';
import { ExperiencesComponent } from './experiences.component';

@NgModule({
  declarations: [
    ExperiencesComponent,
    ResourceComponent,
    ResourceListComponent,
  ],
  imports: [SharedModule, ExperiencesRoutingModule, ReactiveFormsModule],
})
export class ExperiencesModule {}
