import { ViewContainerRef, Component, ViewChild, Input, OnInit, OnDestroy, ComponentRef, ComponentFactoryResolver, Compiler, NgModule } from '@angular/core';


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
       this.addComponent(this.type)
      }

      addComponent(element:string){
        

    const tile = document.createElement(element);
     tile.setAttribute('context', JSON.stringify( this.context));
    
    this.container.element.nativeElement.appendChild(tile)
      }

      ngOnDestroy() {
        if (this.componentRef) {
          this.componentRef.destroy();
          this.componentRef = null;
        }
      }
  }
