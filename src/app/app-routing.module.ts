import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';

const routes: Routes = [
  {
    path: 'cv',
    loadChildren: () =>
      import('./resume/resume.module').then((m) => m.ResumeModule),
  },
  { path: '', redirectTo: 'cv', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
