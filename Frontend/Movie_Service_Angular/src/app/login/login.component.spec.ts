import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Observable, of } from 'rxjs';
import { AuthenticationService } from '../Services/authentication.service';

import { LoginComponent } from './login.component';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fix: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports:[HttpClientModule,MatSnackBarModule,MatDialogModule]
    })
    .compileComponents();

    fix = TestBed.createComponent(LoginComponent);
    component = fix.componentInstance;
    fix.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check h1 tag', ()=>{
    fix = TestBed.createComponent(LoginComponent);
    const h1ele = fix.nativeElement;
    expect(h1ele.querySelector('h1')?.textContent).toContain("MOVIES FLIX");
  })

  it('should check h2 tag', ()=>{
    fix = TestBed.createComponent(LoginComponent);
    const h1ele = fix.nativeElement;
    expect(h1ele.querySelector('h2')?.textContent).toContain("Log in");
  })

  it('should check Login Button', ()=>{
    fix = TestBed.createComponent(LoginComponent);
    const h1ele = fix.nativeElement;
    expect(h1ele.querySelector('button')?.textContent).toContain("Login");
  })
});
