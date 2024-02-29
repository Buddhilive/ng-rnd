import { TestBed } from '@angular/core/testing';

import { IndexdbService } from './indexdb.service';

describe('IndexdbService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IndexdbService = TestBed.get(IndexdbService);
    expect(service).toBeTruthy();
  });
});
