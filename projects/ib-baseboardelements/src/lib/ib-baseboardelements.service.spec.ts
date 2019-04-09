import { TestBed } from '@angular/core/testing';

import { IbBaseboardelementsService } from './ib-baseboardelements.service';

describe('IbBaseboardelementsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IbBaseboardelementsService = TestBed.get(IbBaseboardelementsService);
    expect(service).toBeTruthy();
  });
});
