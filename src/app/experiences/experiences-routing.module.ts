import { ListContextsComponent } from './list-contexts/list-contexts.component';
import { NgModule } from '@angular/core';
import { ContextsResolver } from '@xcedia/experiences';
import { Routes, RouterModule } from '@angular/router';

import { ExperiencesComponent } from './experiences.component';

const routes: Routes = [
  {
    path: '',
    component: ExperiencesComponent,
    children: [
      {
        path: '',
        component: ListContextsComponent,
        resolve: { contexts: ContextsResolver },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExperiencesRoutingModule {}
