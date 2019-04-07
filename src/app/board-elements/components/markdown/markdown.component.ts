import { Component, Inject, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PageScrollService } from 'ngx-page-scroll-core';
import { DOCUMENT } from '@angular/platform-browser';
import { DynamicComponent } from '../../shared/model/dynamiccomponent.model';
import { MarkdownContext } from '../../shared/model/context/MarkDownContext.model';

@Component({
  selector: 'board-markdown',
  templateUrl: './markdown.component.html',
  styleUrls: ['./markdown.component.scss']
})
export class MarkdownComponent extends DynamicComponent<MarkdownContext> implements OnInit  {
   

  
  ngOnInit() {
   
}
}
