import { TestBed } from '@angular/core/testing';

import { ChartsMapService } from './charts-map.service';

describe('ChartsMapService', () => {
  let service: ChartsMapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChartsMapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
