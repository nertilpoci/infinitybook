import { Component, OnInit, ViewEncapsulation, Output, EventEmitter, Input } from '@angular/core';
import { BoardElement } from '../../shared/model/BoardElement';

@Component({
  selector: 'c-resizeable',
  templateUrl: './resizeable.component.html',
  styleUrls: ['./resizeable.component.scss']
})
export class ResizeableComponent extends  BoardElement implements OnInit {

  @Output() dragStopped: EventEmitter<BoardElement> = new EventEmitter();
  @Output() movingOffset: EventEmitter<BoardElement> = new EventEmitter();
  @Input() element : BoardElement
  @Output() elementChange = new EventEmitter();
  @Input() left : number 
  @Output() leftChange = new EventEmitter();

  @Input() top : number 
  @Output() topChange = new EventEmitter();

  @Input() eWidth : number 
  @Output() eWidthChange = new EventEmitter();

  @Input() eHeight : number 
  @Output() eHeightChange = new EventEmitter();
  showHandle : boolean = false
  
  
  ngOnInit() {
  this.x= this.element.x;
  this.y = this.element.y
  this.width = this.element.width
  this.height = this.element.height
     console.log(this.element)
  }
  get position(){
    return {x: this.x, y: this.y}
  }
  onMounseEnter(){
  this.showHandle = true;

  }

  onMouseOut(){
  this.showHandle = false
  this.elementChange.emit(this as BoardElement)
  }
  onMoving(event) {
    this.x= event.x
    this.y= event.y
    this.movingOffset.emit(this as BoardElement);
    this.leftChange.emit(this.x)
    this.topChange.emit(this.top)

  }

  onResizeStop(event) {
   
    
  }
  assignPosition(event){
    this.width= event.clientWidth
    this.height = event.clientHeight
    this.x= this.getTranslateXValue(event.style.transform)
    this.y= this.getTranslateYValue(event.style.transform)
  }
  
  onStop(element:HTMLElement) {
    this.assignPosition(element)
    this.dragStopped.emit(this as BoardElement);
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
