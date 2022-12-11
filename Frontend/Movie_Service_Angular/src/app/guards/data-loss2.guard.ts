import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminpageComponent } from '../adminpage/adminpage.component';

@Injectable({
  providedIn: 'root'
})
export class DataLoss2Guard implements CanDeactivate<AdminpageComponent> {
  canDeactivate(
    component: AdminpageComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(component.status == true){
        return true;
      }
      else{
        if(window.confirm("You might have some unsaved data")){
          return true;
        }
        else return false;
      }
    }
  }
  
