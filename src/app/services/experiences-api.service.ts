import { Observable } from 'rxjs';
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

  experiencesIndex(): Observable<any[]> {
    return this.http.get<any[]>('/api/contexts', {
      headers: this.getDefaultHeaders(),
    });
  }
}
