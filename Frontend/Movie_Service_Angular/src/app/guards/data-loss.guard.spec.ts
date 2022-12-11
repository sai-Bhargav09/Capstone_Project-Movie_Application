import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { DataLossGuard } from './data-loss.guard';

describe('DataLossGuard', () => {
  let guard: DataLossGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[MatSnackBarModule, MatDialogModule, HttpClientModule]
    });
    guard = TestBed.inject(DataLossGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
