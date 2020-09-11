import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './core/auth-guard.service';

const routes: Routes = [
  {
    path: 'experiences',
    loadChildren: () =>
      import('./experiences/experiences.module').then(
        (m) => m.ExperiencesModule
      ),
    canLoad: [AuthGuardService],
  },
  { path: '', redirectTo: 'experiences', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
