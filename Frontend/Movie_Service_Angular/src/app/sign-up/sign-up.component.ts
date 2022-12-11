import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { passwordValidate } from 'src/passwordValidate';

import { AuthenticationService } from '../Services/authentication.service';
import { CombineMethodsService } from '../Services/combine-methods.service';
import { CommonMethodsService } from '../Services/common-methods.service';
import { SnackbarService } from '../Services/snackbar.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  status: boolean=false;
  
  constructor(private authenticationService: AuthenticationService, private formBuilder: FormBuilder, private router:Router,
    private combineService:CombineMethodsService,  private snackbar: SnackbarService) { }

  ngOnInit(): void {
    this.create();
  }

  maxDate = new Date();


  signUpForm = this.formBuilder.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    userName: new FormControl('', [Validators.required, Validators.maxLength(15)]),
    password: new FormControl('', [Validators.required, passwordValidate()]),
    confirmPassword: new FormControl('', [Validators.required]),
    phoneNo: new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
    dateOfBirth: new FormControl('', [Validators.required]),
  },
    {
      validators: this.MustMatch('password', 'confirmPassword')
    });


  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors['MustMatch']) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ MustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  register() {
    // console.log(this.signUpForm.value);
    this.authenticationService.register({
      "email": this.signUpForm.getRawValue().email.toLowerCase(), "userName": this.signUpForm.getRawValue().userName,
      "password": this.signUpForm.getRawValue().password, "phoneNo": this.signUpForm.getRawValue().phoneNo, 
      "dateOfBirth": this.signUpForm.getRawValue().dateOfBirth,
      "userImage": this.imageno, "movieList": [], "reportedMovieList":[]
    }).subscribe(
      response => {
        console.log(response);
      })
    if (this.authenticationService.isUserRegistered == true) {
      this.snackbar.showNotification("Registered Successfully",'ok','success');
      // alert("Registered Successfully");
      this.router.navigateByUrl('/login');
    }
    this.signUpForm.reset();
  }


  images:String[]=[];
  url: any;
  imageno: any;

  create(){
    this.images=['/assets/c488340ad56e5454f4576f6c708b63aa.png', '/assets/chick.png',
    '/assets/flat,1000x1000,075,f.u2.png', '/assets/images.png', '/assets/Netflix-avatar.png'];
  }
  
  addUserImage(i: any) {
    this.imageno=this.combineService.addUserImage(i)
    this.images=this.combineService.images;
  }
}
