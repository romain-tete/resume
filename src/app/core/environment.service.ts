import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

interface IdentityConfig {
  issuer: string;
  appId: string;
  appSecret: string;
}

interface Environment {
  production: boolean;
  identity: IdentityConfig;
}

@Injectable({
  providedIn: 'root',
})
export class EnvironmentService {
  getConfig(): Environment {
    return environment;
  }
}
