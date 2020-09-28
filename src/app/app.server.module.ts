import { CoreModule } from './core/core.module';
import { PageTitleModule } from './shared/page-title/page-title.module';
import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { AppShellComponent } from './app-shell/app-shell.component';
import { PageHeaderModule } from './shared/page-header/page-header.module';
import { LoaderModule } from './shared/loader/loader.module';
import { BrowserModule } from '@angular/platform-browser';

const routes: Routes = [{ path: 'shell', component: AppShellComponent }];

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    CoreModule.forServer(),
    ServerModule,
    RouterModule.forRoot(routes),
    PageHeaderModule,
    PageTitleModule,
    LoaderModule,
  ],
  bootstrap: [AppComponent],
  declarations: [AppComponent, AppShellComponent],
})
export class AppServerModule {}
