import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { PlayvideoComponent } from './playvideo.component';

describe('PlayvideoComponent', () => {
  let component: PlayvideoComponent;
  let fixture: ComponentFixture<PlayvideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayvideoComponent ],
      imports:[HttpClientModule, RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayvideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check empty anchor tag', ()=>{
    fixture = TestBed.createComponent(PlayvideoComponent);
    const h1ele = fixture.nativeElement;
    expect(h1ele.querySelector('a.r1')?.textContent).toContain("");
  })

  it('should check h1 tag', ()=>{
    fixture = TestBed.createComponent(PlayvideoComponent);
    const h1ele = fixture.nativeElement;
    expect(h1ele.querySelector('h1#head')?.textContent).toContain("Play Movies");
  })
});
