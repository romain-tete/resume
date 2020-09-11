import { ExperiencesApiService } from './../services/experiences-api.service';
import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExperiencesResolver implements Resolve<any[]> {
  constructor(private api: ExperiencesApiService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any[]> {
    return this.api.experiencesIndex();
  }
}
