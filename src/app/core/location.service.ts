import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  getOrigin(): string {
    return window.location.origin;
  }

  getHost(): string {
    return window.location.host;
  }
}
