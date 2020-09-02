import { TestBed } from '@angular/core/testing';

import { AreaSelectorService } from './area-selector.service';

describe('AreaSelectorService', () => {
  let service: AreaSelectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AreaSelectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
