import { Component, OnInit, Inject, ViewChild, ElementRef, ViewChildren, QueryList, ContentChildren, TemplateRef, ViewContainerRef } from '@angular/core';
import { PageScrollService, PageScrollInstance } from 'ngx-page-scroll-core';
import { DOCUMENT } from '@angular/common';
import { settings } from 'cluster';
import { setTimeout } from 'timers';
import zenscroll from 'zenscroll'
import { MatCard } from '@angular/material/card';
import { BoardElementComponent } from '../common/boardelement/boardelement.component';
import { BoardElement } from '../../shared/model/BoardElement';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { fromEvent, Subscription } from 'rxjs';
import { take, filter } from 'rxjs/operators';
import { FileService } from '../../shared/services/file.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('basicContainer')
  public basicContainer: ElementRef;
  @ViewChild('userMenu') userMenu: TemplateRef<any>;

  @ViewChildren(BoardElementComponent) boardItems: QueryList<BoardElementComponent>
  ngAfterViewInit() {
  }
  containerWidth: number = window.innerWidth;
  containerHeight: number = window.innerHeight;
  width: number = this.containerWidth;
  height: number = this.containerHeight;

  boardElements: BoardElement<any>[] = [];
  overlayRef: OverlayRef | null;
  sub: Subscription;

  constructor(
    public overlay: Overlay,
    public viewContainerRef: ViewContainerRef,
    private pageScrollService: PageScrollService,
    private fileService: FileService,
    @Inject(DOCUMENT) private document: any) {
    let element1 = new BoardElement<any>();
    element1.x = 200
    element1.y = 200
    element1.width = 100
    element1.height = 50
    element1.type = 'image'
    element1.context = {src: 'http://www.twentyonepilots.com/sites/g/files/g2000004896/f/Sample-image10-highres.jpg'}



    let element2 = new BoardElement<any>();
    element2.x = 400
    element2.y = 400
    element2.width = 100
    element2.height = 150
    element2.type = 'markdown'
    element2.context = {src: 'https://raw.githubusercontent.com/nertilpoci/MultiStorageProvider/master/README.md'}
    console.log('element2', element2)
    this.boardElements.push(element2)
    this.boardElements.push(element1)
  }
  inDragElement: HTMLElement;
  inBounds = true;
  edge = {
    top: true,
    bottom: true,
    left: true,
    right: true
  };
  close() {
    this.sub && this.sub.unsubscribe();
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }
  addNewItem() {
    console.log('add new item')
    this.boardElements.push(new BoardElement<any>({ x: 100, y: 100, width: 300, height: 100 } as BoardElement<any>))
  }
  rightClick({ x, y }: MouseEvent) {
    this.close()
    const positionStrategy = this.overlay.position()
      .flexibleConnectedTo({ x, y })
      .withPositions([
        {
          originX: 'end',
          originY: 'bottom',
          overlayX: 'end',
          overlayY: 'top',
        }
      ]);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.close()
    });

    this.overlayRef.attach(new TemplatePortal(this.userMenu, this.viewContainerRef, {
      $implicit: {}
    }));

    this.sub = fromEvent<MouseEvent>(document, 'click')
      .pipe(
        filter(event => {
          const clickTarget = event.target as HTMLElement;
          return !!this.overlayRef && !this.overlayRef.overlayElement.contains(clickTarget);
        }),
        take(1)
      ).subscribe(() => this.close())

  }
  resizeEnded(element: BoardElement<any>) {
    localStorage.setItem("boarditems", JSON.stringify(this.boardItems.map(z => new BoardElement<any>(z))));
  }
  dragStopped(element: BoardElement<any>) {

    this.trimContainerIfNeeded()

    this.save()
  }
  trimContainerIfNeeded() {
    var xyValues = this.boardItems.map(z => ({ x: (z.x + z.width), y: (z.y + z.width) }))
    var maxX = Math.max(...xyValues.map(z => z.x))
    var maxY = Math.max(...xyValues.map(z => z.y))
    if (this.width > this.containerWidth) this.width = maxX + 10;
    if (this.height > this.containerHeight) this.height = maxY + 10;
    if (this.width < this.containerWidth) this.width = this.containerWidth
    if (this.height < this.containerHeight) this.height = this.containerHeight
  }
  save() {
    localStorage.setItem("boarditems", JSON.stringify(this.boardItems.map(z => new BoardElement<any>(z))));

  }
  elementChanged(item) {
  }
  @debounceMethod(100)
  onMoving(element: BoardElement<any>) {
    console.log(element)
    if (element.x + element.width >= this.width) {
      console.log('width')
      this.width = this.width + 50;
      this.pageScrollService.scroll({
        document: this.document,

        scrollTarget: `#${element.id}`,
        // scrollViews: [this.basicContainer.nativeElement],
        verticalScrolling: true,
        speed: 999999999999,
        duration: 0
      });
    }
    if (element.y + element.height >= this.height) {
      this.height = this.height + 50;
      this.pageScrollService.scroll({
        document: this.document,
        scrollTarget: `#${element.id}`,
        // scrollViews: [this.basicContainer.nativeElement],
        verticalScrolling: false,
        speed: 999999999999,
        duration: 1
      });

    }
    this.dragStopped(element)

    // this.width = this.width + 50;
    // this.height = this.height + 50;
  }
  checkEdge(event) {
    this.edge = event;
  }
  ngOnInit() {
    var bitems = localStorage.getItem("boarditems");
    if (!bitems) return;
    // this.boardElements = JSON.parse(bitems) as BoardElement<any>[];
    // this.boardElements.forEach(z=>z.context= {src:'http://www.twentyonepilots.com/sites/g/files/g2000004896/f/Sample-image10-highres.jpg'})
  }
  scrollToEnd() {
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
      speed: 999999999999,
      duration: 0
    });
  }

  onDelete(element: BoardElement<any>) {
    this.boardElements.splice(this.boardElements.findIndex(z => z.id == element.id), 1)
    this.save()
    this.trimContainerIfNeeded()
  }

  @debounceMethod(1000)
  dragMoved(data: any) {
    this.pageScrollService.scroll({
      document: this.document,
      scrollTarget: '#basicScrollTarget',
      scrollViews: [this.basicContainer.nativeElement],
      verticalScrolling: false,
      speed: 999999999999,
      duration: 1
    });
    this.pageScrollService.scroll({
      document: this.document,

      scrollTarget: '#basicScrollTarget',
      scrollViews: [this.basicContainer.nativeElement],
      verticalScrolling: true,
      speed: 999999999999,
      duration: 0
    });
    window.setTimeout(() => {
      //@ts-ignore

    }, 1000)
  }


/// --- drop

dropHandler(ev){
console.log('drophanlder', ev)
ev.preventDefault();
if (ev.dataTransfer.items) {
  // Use DataTransferItemList interface to access the file(s)
  for (var i = 0; i < ev.dataTransfer.items.length; i++) {
    // If dropped items aren't files, reject them
    if (ev.dataTransfer.items[i].kind === 'file') {
      var file = ev.dataTransfer.items[i].getAsFile();
      this.fileService.ReadFile(file).then(result=>{
        console.log('file result',result)
      })
    }
    
  }
} else {
  // Use DataTransfer interface to access the file(s)
  for (var i = 0; i < ev.dataTransfer.files.length; i++) {
    console.log('... file[' + i + '].name = ' + ev.dataTransfer.files[i].name);
  }
}

}
dragOverHandler(ev){
  console.log('dragoverhandler', ev)
  ev.preventDefault();
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

