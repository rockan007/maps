import { TestBed } from '@angular/core/testing';

import { MapStyleSelectorService } from './map-style-selector.service';

describe('MapStyleSelectorService', () => {
  let service: MapStyleSelectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapStyleSelectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
