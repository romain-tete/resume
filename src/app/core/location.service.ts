import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  getLocalizedOrigin(): string {
    const locale = this.getLocaleFromLocation();
    const localePath = locale ? `/${locale}` : '';
    return window.location.origin + localePath;
  }

  getLocaleFromLocation(): 'en' | 'fr' | undefined {
    const hasLocale = !!window.location.pathname.match(/^\/(en|fr)/);
    return hasLocale
      ? (window.location.pathname.substr(1, 2) as 'en' | 'fr')
      : undefined;
  }

  getHost(): string {
    return window.location.host;
  }
}
