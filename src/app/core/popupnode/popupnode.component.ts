import { Component, OnInit, ViewEncapsulation, Output, EventEmitter, Input, Inject } from '@angular/core';
import {  BoardElement } from 'ibcommon-lib';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'popup-node',
  templateUrl: './popupnode.component.html',
  styleUrls: ['./popupnode.component.scss']
})
export class PopupNodeComponent implements OnInit {
  element : BoardElement<any>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: BoardElement<any>, private dialogRef:MatDialogRef<PopupNodeComponent>  ) {
   this.element = Object.assign({}, data);
  }
  

  ngOnInit() {
  
  }
  


}
