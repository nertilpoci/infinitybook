import { Component, OnInit, ViewEncapsulation, Output, EventEmitter, Input } from '@angular/core';
import {  BoardElement } from 'ibcommon-lib';
import { MatDialog } from '@angular/material';
import { BoardElementSettingsComponent } from '../boardelementsettings/boardelementsettings.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'board-element',
  templateUrl: './boardelement.component.html',
  styleUrls: ['./boardelement.component.scss']
})
export class BoardElementComponent extends  BoardElement<any> implements OnInit {

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
    super();
  }

  ngOnInit() {
    this.id=this.element.id;
  this.x = this.element.x;
  this.y = this.element.y;
  this.width = this.element.width;
  this.height = this.element.height;
  }
  get showHandle() {
    return this.isFullscreen || this._showHandle;
  }
  set showHandle(value: boolean) {
    this._showHandle = value;
  }
  get elementZIndex() {
    return this.isFullscreen ? Number.MAX_SAFE_INTEGER : this.zIndex;
  }
  get elementWidth() {
    return this.isFullscreen ? window.innerWidth - 6 : this.width;
  }
  get elementHeight() {
    return this.isFullscreen ? window.innerHeight - 6 : this.height;
  }
  get position() {
    return this.isFullscreen ? {x: 0, y: 0} : {x: this.x, y: this.y};
  }
  maximize() {
    this.isFullscreen = !this.isFullscreen;
  }
  onMounseEnter() {
  this.showHandle = true;
  }

  onMouseOut() {
  this.showHandle = false;
  }
  onMoving(event) {
    console.log('moving');
    this.x = event.x;
    this.y = event.y;
    this.dragMoving.emit(this as BoardElement<any>);
  }
  onStop(element: HTMLElement) {
    console.log('onstop');
    if (this.isFullscreen) { return; }
    this.assignPosition(element);
    this.dragStopped.emit(this as BoardElement<any>);
  }

  onResizeStop(event) {
    this.width = event.size.width;
    this.height = event.size.height;
    this.resizeEnded.emit(this as BoardElement<any>);
  }
  onResizeStart(event) {

  }
  onResizing(event) {
    // this.width= event.size.width
    // this.height = event.size.height
  }
  assignPosition(event) {
    this.width = event.clientWidth;
    this.height = event.clientHeight;
    this.x = this.getTranslateXValue(event.style.transform);
    this.y = this.getTranslateYValue(event.style.transform);
  }
  delete() {
     this.onDelete.emit(this as BoardElement<any>);
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
      this.context = result.context;
      this.settingsChanged.emit(this as BoardElement<any>);

    });
  }


}
