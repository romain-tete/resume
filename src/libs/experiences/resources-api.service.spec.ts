import { TestBed } from '@angular/core/testing';

import { ExperiencesApiService } from './resources-api.service';

describe('ExperiencesApiService', () => {
  let service: ExperiencesApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExperiencesApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
