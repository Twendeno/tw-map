import { TestBed } from '@angular/core/testing';

import { ClusterMapService } from './cluster-map.service';

describe('ClusterMapService', () => {
  let service: ClusterMapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClusterMapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
