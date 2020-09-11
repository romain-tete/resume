import { TestBed } from '@angular/core/testing';

import { ExperiencesResolver } from './experiences.resolver';

describe('ExperiencesService', () => {
  let service: ExperiencesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExperiencesResolver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
