import { ResumeRoutingModule } from './resume-routing.module';
import { ExperienceModule } from './experience/experience.module';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeComponent } from './resume.component';

@NgModule({
  declarations: [ResumeComponent],
  imports: [CommonModule, ResumeRoutingModule, SharedModule, ExperienceModule],
})
export class ResumeModule {}
