import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageComponent } from './components/image/image.component';
import {  MarkdownModule } from 'ngx-markdown';
import { HttpClient } from '@angular/common/http';
import { MarkdownComponent } from './components/markdown/markdown.component';

@NgModule({
  declarations: [ImageComponent,MarkdownComponent],
  imports: [
    CommonModule,
    MarkdownModule.forRoot({ loader: HttpClient }),

  ],
  exports:[
    ImageComponent,
    MarkdownComponent
  ],
  entryComponents: [ImageComponent, MarkdownComponent]
})
export class BoardElementsModule { }
