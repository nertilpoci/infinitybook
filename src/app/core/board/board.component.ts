import {
  Component,
  OnInit,
  Inject,
  ViewChild,
  ElementRef,
  ViewChildren,
  QueryList,
  TemplateRef,
  ViewContainerRef,
  OnDestroy,
  AfterViewInit,
  Input
} from '@angular/core';

import { PageScrollService, PageScrollInstance } from 'ngx-page-scroll-core';
import { DOCUMENT } from '@angular/common';
import { BoardElementComponent } from '../boardelement/boardelement.component';
import { BoardElement, IWidget } from 'ibcommon-lib';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { fromEvent, Subscription } from 'rxjs';
import { take, filter } from 'rxjs/operators';
import {MatDialog} from '@angular/material';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material';
import { ComponentListComponent } from '../component-list/component-list.component';
import { ResizeService } from '../shared/services/resize.service';
import PerfectScrollbar from 'perfect-scrollbar';


// import { FileService } from '../../shared/services/file.service';
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnDestroy, AfterViewInit {
  constructor(
    private bottomSheet: MatBottomSheet,
    public overlay: Overlay,
    public viewContainerRef: ViewContainerRef,
    private pageScrollService: PageScrollService,
    // private fileService: FileService,
    @Inject(DOCUMENT) private document: any
  ) {

  }
  @ViewChild('basicContainer')
  public basicContainer: ElementRef;
  @ViewChild('boardContext') boardContext: TemplateRef<any>;

  @ViewChildren(BoardElementComponent) boardItems: QueryList<
    BoardElementComponent
  >;
  actions: any[] = [];
  @Input() containerWidth: number
  @Input() containerHeight: number
  width: number = this.containerWidth;
  height: number = this.containerHeight;

  boardElements: BoardElement<any>[] = [];
  overlayRef: OverlayRef | null;
  sub: Subscription;
  inDragElement: HTMLElement;
  inBounds = true;
  edge = {
    top: true,
    bottom: true,
    left: true,
    right: true
  };
  mousePosition: {x, y};
  copyElement: BoardElement<any> = null;
  ngAfterViewInit(): void {
    // const ps = new PerfectScrollbar('#container');
  }
  close() {
    // tslint:disable-next-line:no-unused-expression
    this.sub && this.sub.unsubscribe();
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }
  
  rightClick({ x, y }: MouseEvent) {

    this.actions = [
      {
        label: 'Add new ',
        click : () => {
          this.showNewItemList();
          this.close();
        }
      }
    ];

    if (this.copyElement) {
      this.actions.push({
        label: 'Paste',
        click: () => {
          this.close();
          const element = JSON.parse(JSON.stringify(this.copyElement)) as BoardElement<any>;
          element.x = x;
          element.y  = y;
          this.boardElements.push(element);
        }
      });
    }

    this.showContextMenu(x, y);
  }
  showContextMenu(x: number, y: number) {
    this.mousePosition = {x, y};
    this.close();
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo({ x, y })
      .withPositions([
        {
          originX: 'end',
          originY: 'bottom',
          overlayX: 'end',
          overlayY: 'top'
        }
      ]);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.close()
    });

    this.overlayRef.attach(
      new TemplatePortal(this.boardContext, this.viewContainerRef, {
        $implicit: {}
      })
    );

    this.sub = fromEvent<MouseEvent>(document, 'click')
      .pipe(
        filter(event => {
          const clickTarget = event.target as HTMLElement;
          return (
            !!this.overlayRef &&
            !this.overlayRef.overlayElement.contains(clickTarget)
          );
        }),
        take(1)
      )
      .subscribe(() => this.close());
  }
  boarElementRightClick({x, y}: MouseEvent, element: BoardElement<any>) {
       event.stopPropagation();
       event.preventDefault();
       this.actions = [
        {
          label: 'Copy',
          click : () => {
            this.close();
            this.copyElement = JSON.parse(JSON.stringify(element));
          }
        }
      ];
       this.showContextMenu(x, y);
  }
  resizeEnded() {
    localStorage.setItem(
      'boarditems',
      JSON.stringify(this.boardItems.map(z => z.element))
    );
  }
  dragStopped() {
    this.trimContainerIfNeeded();

    this.save();
  }
  trimContainerIfNeeded() {
    if(!this.boardItems) return;
    console.log('trim if needed');
    const xyValues = this.boardItems.map(z => ({
      x: z.element.x + z.element.width,
      y: z.element.y + z.element.height
    }));
    const maxX = Math.max(...xyValues.map(z => z.x));
    const maxY = Math.max(...xyValues.map(z => z.y));
    if (this.containerWidth < maxX) {
      this.width = maxX;
     } else {
       this.width = this.containerWidth;
     }
    if (this.containerHeight < maxY) {
       this.height = maxY;
       } else {
         this.height = this.containerHeight;
       }

       console.log('maxX', maxX)
       console.log('maxY', maxY)
       console.log('containerW', this.containerWidth)
       console.log('containerH', this.containerHeight)
       console.log('width', this.width)
       console.log('height', this.height)

  }
  save() {
    localStorage.setItem(
      'boarditems',
      JSON.stringify(this.boardItems.map(z => z.element))
    );
  }
  elementChanged() {}
  @debounceMethod(100)
  onMoving(element: BoardElement<any>) {
    return;
    console.log(element);
    if (element.x + element.width >= this.width) {
      console.log('width');
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
    this.dragStopped();

    // this.width = this.width + 50;
    // this.height = this.height + 50;
  }
  checkEdge(event) {
    this.edge = event;
  }
  ngOnInit() {
    const bitems = localStorage.getItem('boarditems');
    if (!bitems) { return; }
    this.boardElements = JSON.parse(bitems) as BoardElement<any>[];
    this.trimContainerIfNeeded();

  }
  ngOnDestroy() {
  }
  scrollToEnd() {
    console.log('scrooll to end');
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
    this.boardElements.splice(
      this.boardElements.findIndex(z => z.id === element.id),
      1
    );
    this.save();
    this.trimContainerIfNeeded();
  }

  @debounceMethod(1000)
  dragMoved() {
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
      // @ts-ignore
    }, 1000);
  }

  /// --- drop

  dropHandler(ev) {
    console.log('drophanlder', ev);
    ev.preventDefault();
    if (ev.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      for (let i = 0; i < ev.dataTransfer.items.length; i++) {
        // If dropped items aren't files, reject them
        if (ev.dataTransfer.items[i].kind === 'file') {
          const file = ev.dataTransfer.items[i].getAsFile();
          // this.fileService.ReadFile(file).then(result => {
          //   console.log('file result', result);
          // });
        }
      }
    } else {
      // Use DataTransfer interface to access the file(s)
      for (let i = 0; i < ev.dataTransfer.files.length; i++) {
        console.log(
          '... file[' + i + '].name = ' + ev.dataTransfer.files[i].name
        );
      }
    }
  }
  dragOverHandler(ev) {
    console.log('dragoverhandler', ev);
    ev.preventDefault();
  }
  settingsChanged(data: BoardElement<any>) {
    console.log('sc', data);
    console.log('elements', this.boardElements);
    const element = this.boardElements.find(z => z.id === data.id);
    element.context.src = data.context.src;
  }

  elementClicked(element: BoardElement<any>) {
    this.calculateZIndexes(element);
  }
  calculateZIndexes(element: BoardElement<any>) {
    console.log('z index');
    const min = Math.min(...this.boardElements.map(z => z.zIndex));
    if (min > 0) {
      this.boardElements.forEach(z => z.zIndex -= min);
    }
    const max = Math.max(...this.boardElements.map(z => z.zIndex));
    element.zIndex = max + 1;
  }
  showNewItemList(): void {
    const bottomSheetRef = this.bottomSheet.open(ComponentListComponent);
    bottomSheetRef.afterDismissed().subscribe((result: IWidget) => {
       if (result) {
         console.log('resut', result);
         const boardElement = new BoardElement<any>();
         boardElement.contextSchema = result.contextSchema;
         boardElement.x = this.mousePosition.x;
         boardElement.y = this.mousePosition.y;
         boardElement.width = 200;
         boardElement.height = 200;
         boardElement.type = result.htmlTag;
         boardElement.context = {  src: '' };
         this.boardElements.push(boardElement);
      }
     });
  }
}
function debounceMethod(ms: number, applyAfterDebounceDelay = false) {
  let timeoutId;
  return  (
    target: object,
    propName: string,
    descriptor: TypedPropertyDescriptor<any>
  ) => {
    const originalMethod = descriptor.value;
    descriptor.value = function(...args: any[]) {
      if (timeoutId) { return; }
      timeoutId = window.setTimeout(() => {
        if (applyAfterDebounceDelay) {
          originalMethod.apply(this, args);
        }
        timeoutId = null;
      }, ms);

      if (!applyAfterDebounceDelay) {
        return originalMethod.apply(this, args);
      }
    };
  };
}
