import { ExperienceModule } from './experience/experience.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ActionsComponent } from './actions/actions.component';

@NgModule({
  declarations: [AppComponent, ActionsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
    ExperienceModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
