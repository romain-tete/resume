import { ExperiencesResolver } from './experiences.resolver';
import { ListExperiencesComponent } from './list-experiences/list-experiences.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExperiencesComponent } from './experiences.component';

const routes: Routes = [
  {
    path: '',
    component: ExperiencesComponent,
    children: [
      {
        path: '',
        component: ListExperiencesComponent,
        resolve: { experiences: ExperiencesResolver },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExperiencesRoutingModule {}
