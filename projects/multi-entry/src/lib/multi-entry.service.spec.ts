import { TestBed } from '@angular/core/testing';

import { MultiEntryService } from './multi-entry.service';

describe('MultiEntryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MultiEntryService = TestBed.get(MultiEntryService);
    expect(service).toBeTruthy();
  });
});
