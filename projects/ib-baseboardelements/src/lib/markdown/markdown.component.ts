import { Component, OnInit } from '@angular/core';
import { DynamicComponent } from 'ibcommon-lib';
import { MarkdownContext} from '../model';
@Component({
  selector: 'lib-markdown',
  templateUrl: './markdown.component.html',
  styleUrls: ['./markdown.component.css']
})
export class MarkdownComponent extends DynamicComponent<MarkdownContext>  implements OnInit  {
  ngOnInit() {

}
}
