import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../Services/authentication.service';
import jwt_decode from 'jwt-decode';
import { AdminService } from '../Services/admin.service';
import { SnackbarService } from '../Services/snackbar.service';
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(private authservice: AuthenticationService, private router: Router, private adminService:AdminService,private snackbar:SnackbarService) { }

  ngOnInit(): void {
  }

  loginForm = new FormGroup({
    "email": new FormControl('', [Validators.required]),
    "password": new FormControl('', [Validators.required])
  })

  responseData: any;
  emailstore: any;
  status: any;
  isUserAdmin:boolean = false;
  userData: any;
  userName: any;
  userEmail: any;
  userRole: any;
  userImage: any;


  login() {
    this.status = "";
    this.authservice.login(this.loginForm.value).subscribe((res) => {
      console.log(res);

      this.responseData = res; //initialising responseData
      localStorage.setItem('jwtkey', this.responseData.token);//using key and value pair

      this.userData = jwt_decode(this.responseData.token);

      this.userName = this.userData.userObject.userName;
      localStorage.setItem('userName', this.userName);

      this.userEmail = this.userData.userObject.email;
      localStorage.setItem('userEmail', this.userEmail);

      this.userRole = this.userData.userObject.role;
      localStorage.setItem('userRole', this.userRole);

      this.userImage = this.userData.userObject.userImage;
      localStorage.setItem('userImage', this.userImage);

      this.authCheck();
    }, (error) => {
      this.status = error;
      console.log(this.status)
      this.authCheck();
      this.loginForm.reset();
    })
  }

  authCheck() {
    if (this.status == "Http failure response for http://localhost:9020/app/auth/login: 404 OK") {
      this.authservice.isUserLoggedIn = false;
      this.snackbar.showNotification('invalid email or password','ok','error');
      // alert("invalid email or password");
      this.router.navigateByUrl('/login');
      this.loginForm.reset();
    }
     else if(this.status=="Http failure during parsing for http://localhost:9020/app/auth/login"){
       this.authservice.isUserLoggedIn = false;
       this.snackbar.showNotification('invalid email or password','ok','error');
       // alert("invalid email or password");
       this.router.navigateByUrl('/login');
       this.loginForm.reset();  
     }
    else {
      this.snackbar.showNotification('Welcome '+localStorage.getItem('userName')?.toUpperCase(),'ok','success');
      // alert("Welcome " + localStorage.getItem('userName')?.toUpperCase());
      this.authservice.isUserLoggedIn = true;
      if(localStorage.getItem('userRole')=="ROLE_ADMIN"){
        this.isUserAdmin=true;}
      this.router.navigateByUrl('/dashboard');
    }
  }


  
}
