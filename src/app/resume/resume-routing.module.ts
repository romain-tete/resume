import { AuthGuardService } from './../core/auth-guard.service';
import { ResumeComponent } from './resume.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: ResumeComponent, canActivate: [AuthGuardService] },
    ]),
  ],
  exports: [RouterModule],
})
export class ResumeRoutingModule {}
