import { ActionsModule } from './actions/actions.module';
import { ResumeRoutingModule } from './resume-routing.module';
import { ExperienceModule } from './experience/experience.module';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeComponent } from './resume.component';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [ResumeComponent, ContactComponent],
  imports: [
    CommonModule,
    ResumeRoutingModule,
    SharedModule,
    ExperienceModule,
    ActionsModule,
  ],
})
export class ResumeModule {}
