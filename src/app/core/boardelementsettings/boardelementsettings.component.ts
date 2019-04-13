import { Component, OnInit, ViewEncapsulation, Output, EventEmitter, Input, Inject } from '@angular/core';
import {  BoardElement } from 'ibcommon-lib';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'board-element-settings',
  templateUrl: './boardelementsettings.component.html',
  styleUrls: ['./boardelementsettings.component.scss']
})
export class BoardElementSettingsComponent implements OnInit {


  constructor(@Inject(MAT_DIALOG_DATA) public data: BoardElement<any>, private dialogRef:MatDialogRef<BoardElementSettingsComponent>  ) {
     console.log('settings', this.data)
  }
   save(data: any){
     console.log('save', data)
     this.dialogRef.close(this.data)
   }

  ngOnInit() {
  
  }
  


}