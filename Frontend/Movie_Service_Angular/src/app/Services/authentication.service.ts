import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs';
import { MovieData } from '../classes/movies';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient) { }

  //api gataway port : 9020
  //no token required here

  //registerUrl="http://localhost:8085/app/register";
  //logInUrl="http://localhost:8082/app/auth/login";

  registerUrl="http://localhost:9020/app/register"; 
  logInUrl="http://localhost:9020/app/auth/login";


  isUserRegistered:boolean=false;
  isUserLoggedIn: boolean = false;
  userAuthFailed:boolean=false;

  register(userData:any){
    this.isUserRegistered=true;
    return this.httpClient.post(this.registerUrl , userData);
  }

  login(userData:any): Observable<any>{
    return this.httpClient.post('http://localhost:9020/app/auth/login',userData,{responseType:'json'}).pipe(catchError(this.handleError))
  }

  handleError(error:any){
    return throwError(error.message || "server error");
  }
}
