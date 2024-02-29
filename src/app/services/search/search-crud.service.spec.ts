import { TestBed } from '@angular/core/testing';

import { SearchCrudService } from './search-crud.service';

describe('SearchCrudService', () => {
  let service: SearchCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
