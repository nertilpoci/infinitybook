import { Component, OnInit, Input } from '@angular/core';
import { DynamicComponent } from 'ibcommon-lib';
import { MarkdownContext } from '../../app/common/model';
@Component({
  selector: 'markdown-element',
  templateUrl: './markdown.component.html',
  styleUrls: ['./markdown.component.css']
})
export class MarkdownComponent  implements OnInit  {
  @Input()
  context: any;
  ngOnInit() {
    if(this.context) this.context = JSON.parse(this.context)
    console.log('markdowncontext', this.context)

}
}
