import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { HomepageComponent } from './homepage.component';

describe('HomepageComponent', () => {
  let component: HomepageComponent;
  let fixture: ComponentFixture<HomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomepageComponent ],
      imports:[HttpClientModule,ReactiveFormsModule, MatSnackBarModule, MatDialogModule, MatAutocompleteModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check Chips Content', ()=>{
    fixture = TestBed.createComponent(HomepageComponent);
    const h1ele = fixture.nativeElement;
    expect(h1ele.querySelector('mat-chip-list mat-chip')?.textContent).toContain("All");
  })

  it('should check Login Link', ()=>{
    fixture = TestBed.createComponent(HomepageComponent);
    const h1ele = fixture.nativeElement;
    expect(h1ele.querySelector('mat-toolbar mat-toolbar-row div a')?.textContent).toContain("Log in");
  })

  it('should check Sign up Link', ()=>{
    fixture = TestBed.createComponent(HomepageComponent);
    const h1ele = fixture.nativeElement;
    expect(h1ele.querySelector('mat-toolbar mat-toolbar-row div a.r2')?.textContent).toContain("Sign up");
  })
});
