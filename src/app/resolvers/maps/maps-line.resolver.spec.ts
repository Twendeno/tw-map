import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { mapsLineResolver } from './maps-line.resolver';

describe('mapsLineResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => mapsLineResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
