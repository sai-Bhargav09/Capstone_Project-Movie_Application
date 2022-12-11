import { TestBed } from '@angular/core/testing';

import { CombineMethodsService } from './combine-methods.service';

describe('CombineMethodsService', () => {
  let service: CombineMethodsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CombineMethodsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
