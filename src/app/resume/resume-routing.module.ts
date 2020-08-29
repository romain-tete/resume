import { ResumeComponent } from './resume.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [RouterModule.forChild([{ path: '', component: ResumeComponent }])],
  exports: [RouterModule],
})
export class ResumeRoutingModule {}
