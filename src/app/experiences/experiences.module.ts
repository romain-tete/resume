import { NgModule } from '@angular/core';

import { ExperiencesRoutingModule } from './experiences-routing.module';
import { ExperiencesComponent } from './experiences.component';
import { SharedModule } from '../shared/shared.module';
import { ListExperiencesComponent } from './list-experiences/list-experiences.component';

@NgModule({
  declarations: [ExperiencesComponent, ListExperiencesComponent],
  imports: [SharedModule, ExperiencesRoutingModule],
})
export class ExperiencesModule {}
