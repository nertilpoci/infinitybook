import { Component, OnInit, Inject, ViewChild, ElementRef, ViewChildren, QueryList, ContentChildren } from '@angular/core';
import { PageScrollService, PageScrollInstance } from 'ngx-page-scroll-core';
import { DOCUMENT } from '@angular/common';
import { settings } from 'cluster';
import { setTimeout } from 'timers';
import zenscroll from 'zenscroll'
import { MatCard } from '@angular/material/card';
import { ResizeableComponent } from '../resizeable/resizeable.component';
import { BoardElement } from '../../shared/model/BoardElement';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('basicContainer')
  public basicContainer: ElementRef;
  @ViewChildren(ResizeableComponent) cards: QueryList<ResizeableComponent>
  ngAfterViewInit() {
  }
  containerWidth:number =window.innerWidth;
  containerHeight:number =window.innerHeight;
  width: number = this.containerWidth;
  height: number = this.containerHeight;

  boardElements : BoardElement[]= [];
  constructor(private pageScrollService: PageScrollService,
     @Inject(DOCUMENT) private document: any) {
       let element1=new BoardElement();
       element1.x=200
       element1.y=200
       element1.width=100
       element1.height=50
      //  this.boardElements.push(element1)


       let element2=new BoardElement();
       element2.x=400
       element2.y=400
       element2.width=100
       element2.height=150
      //  this.boardElements.push(element2)
      }
     inDragElement: HTMLElement;
     inBounds = true;
     edge = {
       top: true,
       bottom: true,
       left: true,
       right: true
     };
  
    dragStopped(element: BoardElement){
      var xyValues = this.cards.map(z=> ({x: ( z.x + z.width), y : (z.y + z.width) }))
      var maxX= Math.max(...xyValues.map(z=>z.x))
      var maxY= Math.max(...xyValues.map(z=>z.y))
      if(this.width > this.containerWidth) this.width= maxX +10;
      if(this.height > this.containerHeight) this.height = maxY + 10;
     
      if(this.width< this.containerWidth) this.width= this.containerWidth
      if(this.height< this.containerHeight) this.height= this.containerHeight

      localStorage.setItem("boarditems", JSON.stringify(this.boardElements));
      console.log(this.boardElements)
    }
    elementChanged(item){
      console.log('elementchanged')
      console.log(item)
    }
    @debounceMethod(100)
    onMoving(element: BoardElement) {
      
      if(element.x + element.width>= this.width) {
        this.width = this.width + 50;
        this.pageScrollService.scroll({
          document: this.document,
          
          scrollTarget: `#${element.id}`,
          // scrollViews: [this.basicContainer.nativeElement],
          verticalScrolling: true,
          speed:999999999999,
          duration: 0
        });
      }
      if(element.y + element.height>= this.height) {
        this.height = this.height + 50;
        this.pageScrollService.scroll({
          document: this.document,
          scrollTarget: `#${element.id}`,
          // scrollViews: [this.basicContainer.nativeElement],
          verticalScrolling: false,
          speed:999999999999,
          duration: 1
        });
        
      }
      this.dragStopped(element)
      
      // this.width = this.width + 50;
      // this.height = this.height + 50;
    }
  
    onMoveEnd(event) {
      // console.log('move end:', event);
      // this.endOffset.x = event.x;
      // this.endOffset.y = event.y;
    }
  checkEdge(event) {
    this.edge = event;
    // console.log('edge:', event);
  }
  ngOnInit() {
   var bitems= localStorage.getItem("boarditems");
   if(!bitems) return;
   this.boardElements = JSON.parse(bitems) as BoardElement[];
  }
  scrollToEnd(){
    console.log('scrooll to end')
    const pageScrollInstance: PageScrollInstance = this.pageScrollService.create({
      document: this.document,
      scrollTarget: '#basicScrollTarget',
      scrollViews: [this.basicContainer.nativeElement],
    });
    // pageScrollInstance.setScrollPosition(800)
    // this.pageScrollService.start(pageScrollInstance);


    this.pageScrollService.scroll({
      document: this.document,
      scrollTarget: '.anchor',
      scrollOffset: 500,
      verticalScrolling: false,
      speed:999999999999,
      duration: 0
    });
  }
  

  @debounceMethod(1000)
  dragMoved(data:any){
    this.pageScrollService.scroll({
      document: this.document,
      scrollTarget: '#basicScrollTarget',
      scrollViews: [this.basicContainer.nativeElement],
      verticalScrolling: false,
      speed:999999999999,
      duration: 1
    });
    this.pageScrollService.scroll({
      document: this.document,
      
      scrollTarget: '#basicScrollTarget',
      scrollViews: [this.basicContainer.nativeElement],
      verticalScrolling: true,
      speed:999999999999,
      duration: 0
    });
  window.setTimeout(()=>{
    //@ts-ignore
    
  },1000)
  }

  
}
function debounceMethod(ms: number, applyAfterDebounceDelay = false) {

  let timeoutId;

  return function (target: Object, propName: string, descriptor: TypedPropertyDescriptor<any>) {
    let originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      if (timeoutId) return;
      timeoutId = window.setTimeout(() => {
        if (applyAfterDebounceDelay) {
          originalMethod.apply(this, args);
        }
        timeoutId = null;
      }, ms);

      if (!applyAfterDebounceDelay) {
        return originalMethod.apply(this, args);
      }
    }
  }
}