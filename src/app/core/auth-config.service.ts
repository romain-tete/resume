import { Injectable } from '@angular/core';
import { AuthConfig } from 'angular-oauth2-oidc';
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
  constructor(private location: LocationService) {}

  getConfig(): AuthConfig {
    return {
      issuer:
        'https://xaresume.b2clogin.com/xaresume.onmicrosoft.com/B2C_1_sign_in/v2.0/',
      clientId: '59bbf0d4-1825-4ae0-a889-c45efa942517',
      dummyClientSecret: 'GHSR-p72~-j3~66btWhnthu.gHcE2KeTDE',
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
}
