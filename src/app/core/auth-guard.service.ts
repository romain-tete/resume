import { OAuthService } from 'angular-oauth2-oidc';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanLoad,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate, CanLoad {
  constructor(private oauth: OAuthService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.oauth.hasValidIdToken();
  }

  canLoad(): boolean {
    return this.oauth.hasValidIdToken();
  }
}
