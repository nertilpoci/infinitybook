import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { createCustomElement } from '@angular/elements';
import { ImageComponent } from '../components/image/image.component';
import { MarkdownComponent } from '../components/markdown/markdown.component';
import { MarkdownModule } from 'ngx-markdown';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PushPipe } from './pipes/push.pipe';
@NgModule({
  declarations: [
    AppComponent,
    ImageComponent,
    MarkdownComponent,
    PushPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MarkdownModule.forRoot({ loader: HttpClient })
  ],
  providers: [HttpClient],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [ImageComponent, MarkdownComponent],
})
export class AppModule { 
  
  constructor(private injector: Injector) {
  }

  ngDoBootstrap() {
    const imageElement = createCustomElement(ImageComponent, { injector: this.injector})
    customElements.define('image-element', imageElement);

    const markdownElement = createCustomElement(MarkdownComponent, { injector: this.injector})
    customElements.define('markdown-element', markdownElement);

  }
}
