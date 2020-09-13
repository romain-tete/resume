import { Context, Impact, Role } from './experiences.types';
import { Observable, of } from 'rxjs';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ExperiencesApiService {
  constructor(private http: HttpClient) {}

  private getDefaultHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Ocp-Apim-Subscription-Key': environment.apiKey,
    });
  }

  contextsIndex(): Observable<Context[]> {
    return this.http.get<any[]>('/api/contexts', {
      headers: this.getDefaultHeaders(),
    });
  }

  contextCreate(context: Context): Observable<Context> {
    return this.http.post<Context>('/api/contexts', context, {
      headers: this.getDefaultHeaders(),
    });
  }

  contextsUpdate(context: Context): Observable<Context> {
    return this.http.put<Context>(`/api/contexts/${context.id}`, context, {
      headers: this.getDefaultHeaders(),
    });
  }

  contextDelete(context: Context): Observable<null> {
    return this.http.delete<null>(`/api/roles/${context.id}`);
  }

  rolesIndex(): Observable<Role[]> {
    const headers = this.getDefaultHeaders();
    return this.http.get<Role[]>('/api/roles', { headers });
  }

  roleCreate(role: Role): Observable<Role> {
    const headers = this.getDefaultHeaders();
    return this.http.post<Role>('/api/roles', role, { headers });
  }

  roleUpdate(role: Role): Observable<Role> {
    const headers = this.getDefaultHeaders();
    return this.http.put<Role>(`/api/roles/${role.id}`, role, { headers });
  }

  roleDelete(id: string): Observable<null> {
    return this.http.delete<null>(`/api/roles/${id}`);
  }

  impactsIndex(): Observable<Impact[]> {
    const headers = this.getDefaultHeaders();
    return this.http.get<Impact[]>('/api/impacts', { headers });
  }

  impactCreate(impact: Impact): Observable<Impact> {
    const headers = this.getDefaultHeaders();
    return this.http.post<Impact>('/api/impacts', impact, { headers });
  }

  impactUpdate(impact: Impact): Observable<Impact> {
    const headers = this.getDefaultHeaders();
    return this.http.put<Impact>(`/api/impacts/${impact.id}`, impact, {
      headers,
    });
  }

  impactDelete(id: string): Observable<null> {
    const headers = this.getDefaultHeaders();
    return this.http.delete<null>(`/api/impacts/${id}`, { headers });
  }
}
