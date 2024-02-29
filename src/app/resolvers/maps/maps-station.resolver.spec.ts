import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { mapsStationResolver } from './maps-station.resolver';

describe('mapsStationResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => mapsStationResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
