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
    _context:any;
    @Input()
    type: string;
    @Input()
    get context():any {return this._context}
    set context(value: any){
      this._context=value;
      if(this.tile)this.tile.setAttribute('context', JSON.stringify( value));
    }
    tile:any;
    
    constructor(
      private componentFactoryResolver: ComponentFactoryResolver,
      private compiler: Compiler) {
  }

    ngOnInit() {
       this.addComponent(this.type)
      }

      addComponent(element:string){
        

    this.tile = document.createElement(element);
    console.log('tile',JSON.stringify( this.context))
    this.tile.setAttribute('context', JSON.stringify( this.context));
    
    this.container.element.nativeElement.appendChild(this.tile)
      }

      ngOnDestroy() {
        if (this.componentRef) {
          this.componentRef.destroy();
          this.componentRef = null;
        }
      }
  }
