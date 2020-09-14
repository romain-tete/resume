import { ContextModule } from './context/context.module';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { ExperiencesRoutingModule } from './experiences-routing.module';
import { ExperiencesComponent } from './experiences.component';

@NgModule({
  declarations: [ExperiencesComponent],
  imports: [
    SharedModule,
    ExperiencesRoutingModule,
    ReactiveFormsModule,
    ContextModule,
  ],
})
export class ExperiencesModule {}
