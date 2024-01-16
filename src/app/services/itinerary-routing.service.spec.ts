import { TestBed } from '@angular/core/testing';

import { ItineraryRoutingService } from './itinerary-routing.service';

describe('ItineraryRoutingService', () => {
  let service: ItineraryRoutingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItineraryRoutingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
