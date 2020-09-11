import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHeaders,
} from '@angular/common/http';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable()
export class AuthenticateRequestsService implements HttpInterceptor {
  constructor(private authService: OAuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.authService.hasValidIdToken()) {
      const authenticatedRequest = req.clone({
        headers: req.headers.append(
          'Authorization',
          `Bearer ${this.authService.getIdToken()}`
        ),
      });
      return next.handle(authenticatedRequest);
    } else {
      return next.handle(req);
    }
  }
}
