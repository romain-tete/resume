import { TestBed } from '@angular/core/testing';

import { ResourcesApiService } from './resources-api.service';

describe('ExperiencesApiService', () => {
  let service: ResourcesApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResourcesApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
