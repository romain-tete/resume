import { Context } from './experiences.types';
import { Observable, of } from 'rxjs';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  contextDelete(context: Context): Observable<void> {
    return of(undefined);
  }
}
