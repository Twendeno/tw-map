import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { mapsDepartureResolver } from './maps-departure.resolver';

describe('mapsDepartureResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => mapsDepartureResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
