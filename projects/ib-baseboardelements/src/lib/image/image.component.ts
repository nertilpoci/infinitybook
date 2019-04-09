import { Component, Inject, OnInit, Input } from '@angular/core';

import { DynamicComponent } from 'ibcommon-lib';
import { ImageContext} from '../model';

@Component({
  selector: 'lib-board-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent extends DynamicComponent<ImageContext> implements OnInit  {

  ngOnInit() {
}
}
