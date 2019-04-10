import { ViewContainerRef, Component, ViewChild, Input, OnInit, OnDestroy, ComponentRef, ComponentFactoryResolver, Compiler, NgModule } from '@angular/core';
// import { ImageComponent } from "../../../board-elements/components/image/image.component";
// import { BoardElement } from "../../../shared/model/BoardElement";
import { DynamicComponent } from 'ibcommon-lib';
import { MarkdownComponent, ImageComponent } from 'ib-baseboardelements';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-dynamic-content',
    template: `
      <div>
        <div #container></div>
      </div>
    `,
  })
  export class DynamicContentComponent implements OnInit, OnDestroy {
    private componentRef: ComponentRef<{}>;
    @ViewChild('container', { read: ViewContainerRef })
    container: ViewContainerRef;

    @Input()
    type: string;
    @Input()
    context: any;
   
    
    constructor(
      private componentFactoryResolver: ComponentFactoryResolver,
      private compiler: Compiler) {
  }

    ngOnInit() {
       this.addComponent('image-element')
      }

      addComponent(element:string){
        

    const tile = document.createElement(element);
    this.container.element.nativeElement.appendChild(tile)
      }

      ngOnDestroy() {
        if (this.componentRef) {
          this.componentRef.destroy();
          this.componentRef = null;
        }
      }
  }
