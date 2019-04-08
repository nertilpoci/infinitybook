import { TestBed } from '@angular/core/testing';

import { IBCommonService } from './ib-common.service';

describe('IBCommonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IBCommonService = TestBed.get(IBCommonService);
    expect(service).toBeTruthy();
  });
});
