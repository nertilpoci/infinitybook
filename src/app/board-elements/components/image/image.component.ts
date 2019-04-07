import { Component, Inject, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PageScrollService } from 'ngx-page-scroll-core';
import { DOCUMENT } from '@angular/platform-browser';
import { DynamicComponent } from '../../shared/model/dynamiccomponent.model';
import { ImageContext } from '../../shared/model/context/ImageContext.model';

@Component({
  selector: 'board-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent extends DynamicComponent<ImageContext> implements OnInit  {
   

  
  ngOnInit() {
   console.log('cntx',this.context)
}
}
