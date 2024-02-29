import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { mapsArrivalResolver } from './maps-arrival.resolver';

describe('mapsArrivalResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => mapsArrivalResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
