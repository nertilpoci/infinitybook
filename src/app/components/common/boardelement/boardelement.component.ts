import { Component, OnInit, ViewEncapsulation, Output, EventEmitter, Input } from '@angular/core';
import { BoardElement } from '../../../shared/model/BoardElement';

@Component({
  selector: 'board-element',
  templateUrl: './boardelement.component.html',
  styleUrls: ['./boardelement.component.scss']
})
export class BoardElementComponent extends  BoardElement implements OnInit {

  @Output() dragStopped: EventEmitter<BoardElement> = new EventEmitter();
  @Output() dragMoving: EventEmitter<BoardElement> = new EventEmitter();
  @Output() dragStarted: EventEmitter<BoardElement> = new EventEmitter();
  @Output() resizeStarted: EventEmitter<BoardElement> = new EventEmitter();
  @Output() resizing: EventEmitter<BoardElement> = new EventEmitter();
  @Output() resizeEnded: EventEmitter<BoardElement> = new EventEmitter();

  @Input() element : BoardElement
  isFullscreen = false
  showHandle : boolean = false
  constructor(){
    super()
  }
  
  ngOnInit() {
  this.x= this.element.x;
  this.y = this.element.y
  this.width = this.element.width
  this.height = this.element.height
  }
  get elementWidth(){
    return this.isFullscreen ? window.innerWidth : this.width;
  }
  get elementHeight(){
    return this.isFullscreen ? window.innerHeight : this.height;
  }
  get position(){
    return this.isFullscreen? {x: 0, y: 0} : {x: this.x, y: this.y}
  }
  maximize(){
    this.isFullscreen= !this.isFullscreen
    console.log(this)
  }
  onMounseEnter(){
  this.showHandle = true;
  }

  onMouseOut(){
  this.showHandle = false
  }
  onMoving(event) {
    console.log('moving')
    this.x= event.x
    this.y= event.y
    this.dragMoving.emit(this as BoardElement);
  }
  onStop(element:HTMLElement) {
    console.log('onstop')
    if(this.isFullscreen) return
    this.assignPosition(element)
    this.dragStopped.emit(this as BoardElement);
  }

  onResizeStop(event) {
    this.width= event.size.width
    this.height = event.size.height
    this.resizeEnded.emit(this as BoardElement)
  }
  onResizeStart(event){
    
  }
  onResizing(event){
    // this.width= event.size.width
    // this.height = event.size.height
  }
  assignPosition(event){
    this.width= event.clientWidth
    this.height = event.clientHeight
    this.x= this.getTranslateXValue(event.style.transform)
    this.y= this.getTranslateYValue(event.style.transform)
  }
  
  
 getTranslateXValue(translateString){

    var n = translateString.indexOf("(");
    var n1 = translateString.indexOf(",");
  
    var res = parseInt(translateString.slice(n+1,n1-2));
  
  return res;
  
  }
 getTranslateYValue(translateString){
  
   var n = translateString.indexOf(",");
    var n1 = translateString.indexOf(")");
  
    var res = parseInt(translateString.slice(n+1,n1-1));
  return res;
  
  }
   
  
}
