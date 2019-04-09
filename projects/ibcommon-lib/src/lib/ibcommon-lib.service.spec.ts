import { TestBed } from '@angular/core/testing';

import { IbcommonLibService } from './ibcommon-lib.service';

describe('IbcommonLibService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IbcommonLibService = TestBed.get(IbcommonLibService);
    expect(service).toBeTruthy();
  });
});
