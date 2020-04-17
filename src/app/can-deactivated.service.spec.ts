import { TestBed } from '@angular/core/testing';

import { CanDeactivatedService } from './can-deactivated.service';

describe('CanDeactivatedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CanDeactivatedService = TestBed.get(CanDeactivatedService);
    expect(service).toBeTruthy();
  });
});
