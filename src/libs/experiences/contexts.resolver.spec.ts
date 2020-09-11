import { TestBed } from '@angular/core/testing';

import { ContextsResolver } from './contexts.resolver';

describe('ExperiencesService', () => {
  let service: ContextsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContextsResolver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
