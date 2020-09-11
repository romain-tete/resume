import { AuthenticateRequestsService } from './authenticate-requests.service';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { OAuthModule, OAuthService } from 'angular-oauth2-oidc';
import { AuthConfigService } from './auth-config.service';
import { LocationService } from './location.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  imports: [HttpClientModule, OAuthModule.forRoot()],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (
        oauthService: OAuthService,
        authConfig: AuthConfigService
      ) => () => {
        oauthService.configure(authConfig.getConfig());
        return oauthService.loadDiscoveryDocumentAndLogin();
      },
      deps: [OAuthService, AuthConfigService],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticateRequestsService,
      multi: true,
    },
  ],
})
export class CoreModule {}
