import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../Services/authentication.service';
import { CommonMethodsService } from '../Services/common-methods.service';

@Component({
  selector: 'app-latest-fix',
  templateUrl: './latest-fix.component.html',
  styleUrls: ['./latest-fix.component.css']
})
export class LatestFixComponent implements OnInit {

  constructor(private router:Router, private commonService:CommonMethodsService) { }

  ngOnInit(): void {
  }

  close(){
    this.router.navigateByUrl('/dashboard');
  }

}
