import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogbox',
  templateUrl: './dialogbox.component.html',
  styleUrls: ['./dialogbox.component.css']
})
export class DialogboxComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
  public matDialogRef:MatDialogRef<DialogboxComponent>) { }

  ngOnInit(): void {
  }

  closeDialog(){
    this.matDialogRef.close(false);
  }

}
