import { Component, OnInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'c-resizeable',
  templateUrl: './resizeable.component.html',
  styleUrls: ['./resizeable.component.scss']
})
export class ResizeableComponent implements OnInit {

  @Output() dragStopped: EventEmitter<ResizeableComponent> = new EventEmitter();

  public width : Number= 200;
  public height : Number= 200;
  public x : Number= 0;
  public y : Number= 0;
  ngOnInit() {
  

  }
  
  onResizeStop(event) {
    console.log(event)
    this.width= event.size.width
    this.height = event.size.height
    this.x = event.position.left
    this.y = event.position.top
  }

  
  onStop(event:HTMLElement) {
    console.log('stopped output:', event);
    console.log('transform:', event.style.transform);
    this.x= this.getTranslateXValue(event.style.transform)
    this.y= this.getTranslateYValue(event.style.transform)
    this.dragStopped.emit(this);
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
