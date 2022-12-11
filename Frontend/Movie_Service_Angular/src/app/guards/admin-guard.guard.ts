import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../Services/authentication.service';
import { SnackbarService } from '../Services/snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardGuard implements CanActivateChild {
  constructor(private authserv:AuthenticationService, private router: Router, private snackbar:SnackbarService) { }
  

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(state.url == '/dashboard/latestfix'){
      return this.checkIsUserAdmin(state.url);
    }
    else{
      return false;
    }
  }

  checkIsUserAdmin(url: string) {
    if (localStorage.getItem('userRole') == "ROLE_ADMIN") {
      return true;
    }
    else {
      this.snackbar.showNotification("Authorization failed",'ok','error');
      // alert("only for admin");
      return this.router.navigateByUrl("/dashboard");
    }
  }


  
}
