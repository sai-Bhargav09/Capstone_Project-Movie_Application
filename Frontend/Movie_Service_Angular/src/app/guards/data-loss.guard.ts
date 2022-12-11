import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../Services/authentication.service';
import { CommonMethodsService } from '../Services/common-methods.service';
import { SnackbarService } from '../Services/snackbar.service';
import { SignUpComponent } from '../sign-up/sign-up.component';

@Injectable({
  providedIn: 'root'
})
export class DataLossGuard implements CanDeactivate<SignUpComponent> {
  constructor(private snackbar: SnackbarService, private commonMethod:CommonMethodsService, private authenticationService:AuthenticationService){}

  result:boolean=true;
  canDeactivate(
    component: SignUpComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let result:boolean=false;
    if(component.status == true){
      return true;
    }
    else if(this.authenticationService.isUserRegistered == true){
      return true;
    }
    else{
      if(window.confirm("You might have some unsaved data")){
        return true;
      }
      else return false;
    }
  }

  windowsConfirm(){
    this.snackbar.openConfirmBox("Are you sure to exit ").afterClosed().subscribe(resp=>{
      if(resp){
        this.result=true;
      }
      else{
        this.result=false;
      }
    })
    return this.result;
  }
  
}
