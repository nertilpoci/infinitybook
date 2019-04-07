import { ViewContainerRef, Component, ViewChild, Input, OnInit, OnDestroy, ComponentRef, ComponentFactoryResolver } from "@angular/core";
import { ImageComponent } from "../../../board-elements/components/image/image.component";
import { BoardElement } from "../../../shared/model/BoardElement";
import { DynamicComponent } from "../../../board-elements/shared/model/dynamiccomponent.model";
import { MarkdownComponent } from "../../../board-elements/components/markdown/markdown.component";

@Component({
    selector: 'dynamic-content',
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
    constructor(private componentFactoryResolver: ComponentFactoryResolver) {}
    private mappings = {
        'image': ImageComponent,
        'markdown': MarkdownComponent
      };
      
      getComponentType(typeName: string) {
        let type = this.mappings[typeName];
        return type ;
      }
    ngOnInit() {
        if (this.type) {
          let componentType = this.getComponentType(this.type);
          console.log('type', componentType)
          let factory = this.componentFactoryResolver.resolveComponentFactory(
            componentType
          );
          this.componentRef = this.container.createComponent(factory);
          let instance = <DynamicComponent<any>> this.componentRef.instance;
          console.log('instance',instance)
          console.log('instancecontext', this.context)
          instance.context = this.context;
        }
      }
    
      ngOnDestroy() {
        if (this.componentRef) {
          this.componentRef.destroy();
          this.componentRef = null;
        }
      }
  }