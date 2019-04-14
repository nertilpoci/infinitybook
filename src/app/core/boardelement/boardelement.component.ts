import { Component, OnInit, ViewEncapsulation, Output, EventEmitter, Input } from '@angular/core';
import {  BoardElement } from 'ibcommon-lib';
import { MatDialog } from '@angular/material';
import {  PopupNodeComponent } from '../popupnode/popupnode.component';
import { BoardElementSettingsComponent } from '../boardelementsettings/boardelementsettings.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'board-element',
  templateUrl: './boardelement.component.html',
  styleUrls: ['./boardelement.component.scss']
})
export class BoardElementComponent implements OnInit {

  @Output() settingsChanged: EventEmitter<BoardElement<any>> = new EventEmitter();
  @Output() dragStopped: EventEmitter<BoardElement<any>> = new EventEmitter();
  @Output() dragMoving: EventEmitter<BoardElement<any>> = new EventEmitter();
  @Output() dragStarted: EventEmitter<BoardElement<any>> = new EventEmitter();
  @Output() resizeStarted: EventEmitter<BoardElement<any>> = new EventEmitter();
  @Output() resizing: EventEmitter<BoardElement<any>> = new EventEmitter();
  @Output() resizeEnded: EventEmitter<BoardElement<any>> = new EventEmitter();
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onDelete: EventEmitter<BoardElement<any>> = new EventEmitter();

  @Input() element: BoardElement<any>;
  isFullscreen = false;
  // tslint:disable-next-line:variable-name
  private _showHandle = false;
  constructor(
    public dialog: MatDialog
  ) {
  }

  ngOnInit() {
  }
  get showHandle() {
    return this.isFullscreen || this._showHandle;
  }
  set showHandle(value: boolean) {
    this._showHandle = value;
  }
  get elementZIndex() {
    return this.isFullscreen ? Number.MAX_SAFE_INTEGER : this.element.zIndex;
  }
  get elementWidth() {
    return this.isFullscreen ? window.innerWidth - 6 : this.element.width;
  }
  get elementHeight() {
    return this.isFullscreen ? window.innerHeight - 6 : this.element.height;
  }
  get position() {
    return this.isFullscreen ? {x: 0, y: 0} : {x: this.element.x, y: this.element.y};
  }
  maximize() {
    const dialogRef = this.dialog.open(PopupNodeComponent, {
     
      data: this.element
    });
      
  }
  onMounseEnter() {
  this.showHandle = true;
  }

  onMouseOut() {
  this.showHandle = false;
  }
  onMoving(event) {
    this.element.x = event.x;
    this.element.y = event.y;
    this.dragMoving.emit(this.element);
  }
  onStop(element: HTMLElement) {
    console.log('onstop');
    if (this.isFullscreen) { return; }
    this.assignPosition(element);
    this.dragStopped.emit(this.element);
  }

  onResizeStop(event) {
    this.element.width = event.size.width;
    this.element.height = event.size.height;
    this.resizeEnded.emit(this.element);
  }
  onResizeStart(event) {

  }
  onResizing(event) {
    // this.width= event.size.width
    // this.height = event.size.height
  }
  assignPosition(event) {
    this.element.width = event.clientWidth;
    this.element.height = event.clientHeight;
    this.element.x = this.getTranslateXValue(event.style.transform);
    this.element.y = this.getTranslateYValue(event.style.transform);
  }
  delete() {
     this.onDelete.emit(this.element);
  }

 getTranslateXValue(translateString) {

    const n = translateString.indexOf('(');
    const n1 = translateString.indexOf(',');

    // tslint:disable-next-line:radix
    const res = parseInt(translateString.slice(n + 1, n1 - 2));

    return res;

  }
 getTranslateYValue(translateString) {

   const n = translateString.indexOf(',');
   const n1 = translateString.indexOf(')');

   // tslint:disable-next-line:radix
   const res = parseInt(translateString.slice(n + 1, n1 - 1));
   return res;

  }

  showSettings(){
    const dialogRef = this.dialog.open(BoardElementSettingsComponent, {
      minWidth: '400px',
      data: this.element
    });
      console.log('s', this.element.contextSchema)
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: `, result);
      this.element.context = result;
      //  this.settingsChanged.emit(this as BoardElement<any>);

    });
  }


}
