import { NgModule } from '@angular/core';
import { ImageComponent } from './image/image.component';

@NgModule({
  declarations: [ImageComponent],
  imports: [
  ],
  exports: [ImageComponent],
  entryComponents: [ImageComponent],
  providers: [{
     provide: 'plugins',
     useValue: [{
       name: 'plugin-image-component',
       component: ImageComponent
     }],
     multi: true
   }]
})
export class IbImageElementModule { }
