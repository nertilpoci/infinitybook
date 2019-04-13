import { Component, OnInit, Input } from '@angular/core';
import { DynamicComponent } from 'ibcommon-lib';
import { MarkdownContext } from '../../app/common/model';
import { ViewModelService } from '../../app/services/view-model.service';
@Component({
  selector: 'markdown-element',
  templateUrl: './markdown.component.html',
  styleUrls: ['./markdown.component.css'],
  providers:[ViewModelService]
})
export class MarkdownComponent   {
  @Input()
  get context(): any {return this.vm.data}
  set context(value:any) {
    console.log('markdown', value)
    console.log('type', typeof value)

    this.vm.data=value; 
  }
 


  constructor(public vm: ViewModelService) { }
}
