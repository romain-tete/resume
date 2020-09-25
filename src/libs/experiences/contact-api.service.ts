import { environment } from '../../environments/environment';
import { Contact } from './experiences.types';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ContactAPIService {
  private getDefaultHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Ocp-Apim-Subscription-Key': environment.apiKey,
    });
  }

  constructor(private http: HttpClient) {}

  getContact(): Observable<Contact> {
    const headers = this.getDefaultHeaders();
    return this.http.get<Contact>(`/api/contacts/default`, { headers });
  }

  updateContact(contact: Contact): Observable<Contact> {
    const headers = this.getDefaultHeaders();
    return this.http.put<Contact>(`/api/contacts/default`, contact, {
      headers,
    });
  }

  deleteContact(name = 'default'): Observable<void> {
    const headers = this.getDefaultHeaders();
    return this.http.delete<void>(`/api/contacts/default`, { headers });
  }
}
