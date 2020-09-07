import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  getOrigin(): string {
    const origin = window.location.origin;
    const hasLocale = !!window.location.pathname.match(/^\/(en|fr)/);
    const localePath = hasLocale ? window.location.pathname.substr(0, 3) : '';

    return window.location.origin + localePath;
  }

  getHost(): string {
    return window.location.host;
  }
}
