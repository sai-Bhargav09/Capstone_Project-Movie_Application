import { TestBed } from '@angular/core/testing';

import { DataLoss2Guard } from './data-loss2.guard';

describe('DataLoss2Guard', () => {
  let guard: DataLoss2Guard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DataLoss2Guard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
