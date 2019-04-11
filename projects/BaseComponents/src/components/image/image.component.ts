import { Component, Inject, OnInit, Input } from '@angular/core';

import { DynamicComponent } from 'ibcommon-lib';
import { ImageContext } from '../../app/common/model';

@Component({
  selector: 'image-element',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit  {

  @Input()
  public context: any;
  ngOnInit() {
    console.log('context', this.context)

    if(this.context) this.context = JSON.parse(this.context)
}
}
