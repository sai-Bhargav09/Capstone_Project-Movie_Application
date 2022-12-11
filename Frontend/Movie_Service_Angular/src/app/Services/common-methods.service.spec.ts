import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { CommonMethodsService } from './common-methods.service';

describe('CommonMethodsService', () => {
  let service: CommonMethodsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule, MatSnackBarModule, MatDialogModule]
    });
    service = TestBed.inject(CommonMethodsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
