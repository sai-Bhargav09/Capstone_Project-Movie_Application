import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { LatestFixComponent } from './latest-fix.component';

describe('LatestFixComponent', () => {
  let component: LatestFixComponent;
  let fixture: ComponentFixture<LatestFixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LatestFixComponent ],
      imports:[HttpClientModule, MatSnackBarModule, MatDialogModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LatestFixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
