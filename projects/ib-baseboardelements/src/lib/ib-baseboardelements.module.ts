import { NgModule } from '@angular/core';
import { IbBaseboardelementsComponent } from './ib-baseboardelements.component';
import { MarkdownComponent } from './markdown/markdown.component';
import { ImageComponent } from './image/image.component';
import {  MarkdownModule } from 'ngx-markdown';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [IbBaseboardelementsComponent, MarkdownComponent, ImageComponent],
  imports: [
    HttpClientModule,
    MarkdownModule.forRoot({ loader: HttpClient }),
  ],
  exports: [IbBaseboardelementsComponent ],
  entryComponents: [MarkdownComponent, ImageComponent]
})
export class IbBaseboardelementsModule { }
