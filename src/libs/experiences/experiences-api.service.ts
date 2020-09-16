import { ExperiencesResource } from './experiences.types';
import { Observable, of } from 'rxjs';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface ResourceBackend<T extends ExperiencesResource> {
  index: () => Observable<T[]>;
  create: (resource: T) => Observable<T>;
  update: (resource: T) => Observable<T>;
  delete: (resource: T) => Observable<null>;
}

@Injectable({
  providedIn: 'root',
})
export class ExperiencesApiService {
  static backends: Record<ExperiencesResource['kind'], Backend<any>> = {
    Context: null,
    Role: null,
    Impact: null,
  };

  constructor(private http: HttpClient) {}

  getResourceBackend<T extends ExperiencesResource>(
    kind: ExperiencesResource['kind']
  ): Backend<T> {
    if (ExperiencesApiService.backends[kind]) {
      return ExperiencesApiService.backends[kind];
    } else {
      const backend = new Backend<T>(this.http, kind);
      ExperiencesApiService.backends[kind] = backend;
      return backend;
    }
  }
}

export class Backend<T extends ExperiencesResource>
  implements ResourceBackend<T> {
  constructor(
    private http: HttpClient,
    private kind: ExperiencesResource['kind']
  ) {}

  private getDefaultHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Ocp-Apim-Subscription-Key': environment.apiKey,
    });
  }

  private getEndpoint(): string {
    const resourceEndpoints: Record<ExperiencesResource['kind'], string> = {
      Context: 'contexts',
      Role: 'roles',
      Impact: 'impacts',
    };

    return resourceEndpoints[this.kind];
  }

  index(): Observable<T[]> {
    const headers = this.getDefaultHeaders();
    return this.http.get<T[]>(`/api/${this.getEndpoint()}`, {
      headers,
    });
  }

  create(resource: T): Observable<T> {
    const headers = this.getDefaultHeaders();
    return this.http.post<T>(`/api/${this.getEndpoint()}`, resource, {
      headers,
    });
  }

  update(resource: T): Observable<T> {
    const headers = this.getDefaultHeaders();
    return this.http.put<T>(
      `/api/${this.getEndpoint()}/${resource.id}`,
      resource,
      {
        headers,
      }
    );
  }

  delete(resource: T): Observable<null> {
    const headers = this.getDefaultHeaders();
    console.log(`Delete ${resource.kind} (${resource.id})`);
    return of(null);
    // return this.http.delete<null>(`/api/${this.getEndpoint()}/${resource.id}`, {
    //   headers,
    // });
  }
}
