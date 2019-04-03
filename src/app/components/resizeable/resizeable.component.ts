import { Component, OnInit, ViewEncapsulation, Output, EventEmitter, Input } from '@angular/core';
import { BoardElement } from '../../shared/model/BoardElement';

@Component({
  selector: 'c-resizeable',
  templateUrl: './resizeable.component.html',
  styleUrls: ['./resizeable.component.scss']
})
export class ResizeableComponent extends  BoardElement implements OnInit {

  @Output() dragStopped: EventEmitter<BoardElement> = new EventEmitter();
  @Output() dragMoving: EventEmitter<BoardElement> = new EventEmitter();
  @Output() dragStarted: EventEmitter<BoardElement> = new EventEmitter();
  @Output() resizeStarted: EventEmitter<BoardElement> = new EventEmitter();
  @Output() resizing: EventEmitter<BoardElement> = new EventEmitter();
  @Output() resizeEnded: EventEmitter<BoardElement> = new EventEmitter();

  @Input() element : BoardElement
  
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
  get position(){
    return {x: this.x, y: this.y}
  }
  onMounseEnter(){
  this.showHandle = true;
  }

  onMouseOut(){
  this.showHandle = false
  }
  onMoving(event) {
    this.x= event.x
    this.y= event.y
    this.dragMoving.emit(this as BoardElement);
  }
  onStop(element:HTMLElement) {
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
    this.width= event.size.width
    this.height = event.size.height
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
