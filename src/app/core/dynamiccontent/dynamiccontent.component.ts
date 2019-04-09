import {
   ViewContainerRef,
   Component,
   ViewChild,
   Input,
   OnInit,
   OnDestroy,
   ComponentRef,
   ComponentFactoryResolver,
   Compiler,
   Injector,
   AfterContentChecked,
   AfterViewInit
  } from '@angular/core';
// import { ImageComponent } from "../../../board-elements/components/image/image.component";
// import { BoardElement } from "../../../shared/model/BoardElement";
import { DynamicComponent } from 'ibcommon-lib';
import { MarkdownComponent, ImageComponent } from 'ib-baseboardelements';
declare const SystemJS: any;

@Component({
    selector: 'app-dynamic-content',
    template: `
      <div>
        <div #container></div>
      </div>
    `,
  })
  export class DynamicContentComponent implements OnInit, AfterViewInit, OnDestroy {

    private componentRef: ComponentRef<{}>;
    @ViewChild('container', { read: ViewContainerRef })
    container: ViewContainerRef;

    @Input()
    type: string;
    @Input()
    context: any;
    constructor(private componentFactoryResolver: ComponentFactoryResolver, private compiler: Compiler, private injector: Injector) {}
    private mappings = {
         image: ImageComponent,
         markdown: MarkdownComponent
      };

      getComponentType(typeName: string) {
        const type = this.mappings[typeName];
        return type ;
      }
    ngOnInit() {
        // if (this.type) {
        //   const componentType = this.getComponentType(this.type);
        //   console.log('type', componentType);
        //   const factory = this.componentFactoryResolver.resolveComponentFactory(
        //     componentType
        //   );
        //   this.componentRef = this.container.createComponent(factory);
        //   const instance = this.componentRef.instance as DynamicComponent<any>;
        //   console.log('instance', instance);
        //   console.log('instancecontext', this.context);
        //   instance.context = this.context;
        // }
      }
      ngAfterViewInit(): void {
        this.loadPlugins();
      }
      ngOnDestroy() {
        if (this.componentRef) {
          this.componentRef.destroy();
          this.componentRef = null;
        }
      }

     async loadPlugins() {
         // import external module bundle
    const module = await SystemJS.import('../../../plugins/plugin-image.bundle.js');

    // compile module
    const moduleFactory = await this.compiler
                                    .compileModuleAsync<any>(module.IbImageElementModule);

    // resolve component factory
    const moduleRef = moduleFactory.create(this.injector);

    // get the custom made provider name 'plugins'
    const componentProvider = moduleRef.injector.get('plugins');

    // from plugins array load the component on position 0
    const componentFactory = moduleRef.componentFactoryResolver
                                      .resolveComponentFactory<any>(
                                          componentProvider[0][0].component
                                      );

    // compile component
    const pluginComponent = this.container.createComponent(componentFactory);

    // sending @Input() values
    pluginComponent.instance.context = {
      src:
        'http://www.twentyonepilots.com/sites/g/files/g2000004896/f/Sample-image10-highres.jpg'
    };

    // accessing the component template view
    // (pluginComponent.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
      }
  }
