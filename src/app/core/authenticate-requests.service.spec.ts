import { TestBed } from '@angular/core/testing';

import { AuthenticateRequestsService } from './authenticate-requests.service';

describe('AuthenticateRequestsService', () => {
  let service: AuthenticateRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenticateRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
