import { Injectable } from '@angular/core';
import { AuthConfig } from 'angular-oauth2-oidc';
import { EnvironmentService } from './environment.service';
import { LocationService } from './location.service';

interface EnvConfig {
  issuer: string;
  appId: string;
  appSecret: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthConfigService {
  constructor(
    private location: LocationService,
    private env: EnvironmentService
  ) {}

  getConfig(): AuthConfig {
    const envConfig = this.getEnvConfig();
    return {
      issuer: envConfig.issuer,
      clientId: envConfig.appId,
      dummyClientSecret: envConfig.appSecret,
      redirectUri: `${this.location.getOrigin()}`,
      responseType: 'code',
      scope: 'openid offline_access',
      showDebugInformation: true,
      skipIssuerCheck: true,
      strictDiscoveryDocumentValidation: false,
      customQueryParams: {
        p: 'B2C_1_sign_in',
      },
    };
  }

  private getEnvConfig(): EnvConfig {
    const env = this.env.getConfig();

    return env.identity;
  }
}
