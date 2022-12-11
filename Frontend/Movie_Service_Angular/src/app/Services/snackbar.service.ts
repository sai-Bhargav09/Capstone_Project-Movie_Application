import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import {MatDialog} from '@angular/material/dialog';
import { DialogboxComponent } from '../dialogbox/dialogbox.component';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackbar:MatSnackBar, private dialog:MatDialog) { }

  showNotification(displayMessage:string, buttonText:string, messageType:'error'|'success'){
    this.snackbar.openFromComponent(SnackbarComponent,{
      data:{
        message:displayMessage,
        button:buttonText,
        type:messageType
      },
      duration:3000,
      horizontalPosition:'center',
      verticalPosition:'bottom',
      panelClass:messageType
    })
  }

  openConfirmBox(msg:any){
    return this.dialog.open(DialogboxComponent, {
      data:{
        mes:msg
      },
      width:'400px',
      disableClose:true,
      panelClass:'confirm-box-container'
    })
  }
}
