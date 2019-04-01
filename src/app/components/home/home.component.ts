import { Component, OnInit, Inject, ViewChild, ElementRef, ViewChildren, QueryList, ContentChildren } from '@angular/core';
import { PageScrollService, PageScrollInstance } from 'ngx-page-scroll-core';
import { DOCUMENT } from '@angular/common';
import { settings } from 'cluster';
import { setTimeout } from 'timers';
import zenscroll from 'zenscroll'
import { MatCard } from '@angular/material/card';
import { ResizeableComponent } from '../resizeable/resizeable.component';
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
    this.cards.forEach(alertInstance => console.log(alertInstance));
  }
  movingOffset: any;
  endOffset: any;
  width = 500;
  height= 500;
  constructor(private pageScrollService: PageScrollService,
     @Inject(DOCUMENT) private document: any) { }
     inDragElement: HTMLElement;
     inBounds = true;
     edge = {
       top: true,
       bottom: true,
       left: true,
       right: true
     };
     onStart(event) {
       this.inDragElement = event
      console.log('started output:', event);
    }
  
    onStop(event) {
      this.inDragElement = null
      console.log('stopped output:', event);


    }

    dragStopped(element: ResizeableComponent){
      console.log('element')
      console.log(element)
      this.cards.forEach(alertInstance => console.log(alertInstance));
    }

    @debounceMethod(100)
    onMoving(event) {
      console.log('moving:', event);
      // this.movingOffset.x = event.x;
      // this.movingOffset.y = event.y;
      if(event.x + this.inDragElement.clientWidth>= this.width) {
        this.width = this.width + 50;
        this.pageScrollService.scroll({
          document: this.document,
          
          scrollTarget: '#basicScrollTarget',
          // scrollViews: [this.basicContainer.nativeElement],
          verticalScrolling: true,
          speed:999999999999,
          duration: 0
        });
      }
      if(event.y + this.inDragElement.clientHeight>= this.height) {
        this.height = this.height + 50;
        this.pageScrollService.scroll({
          document: this.document,
          scrollTarget: '#basicScrollTarget',
          // scrollViews: [this.basicContainer.nativeElement],
          verticalScrolling: false,
          speed:999999999999,
          duration: 1
        });
        
      }
     
      
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
    // window.setTimeout(()=>{
    //   console.log(this.document)

    //   var defaultDuration = 500
    //   var edgeOffset = 30
    //   var myDiv = document.getElementById("container")
    //   var myScroller = zenscroll.createScroller(myDiv, defaultDuration, edgeOffset)
    //   myScroller.toY(900)
    // },5000)
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
    console.log(data)
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