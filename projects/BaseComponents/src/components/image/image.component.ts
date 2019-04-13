import { Component, Inject, OnInit, Input } from '@angular/core';

import { DynamicComponent } from 'ibcommon-lib';
import { ImageContext } from '../../app/common/model';
import { ViewModelService } from '../../app/services/view-model.service';

@Component({
  selector: 'image-element',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit  {

  @Input()
  get context(): any {return this.vm.data}
  set context(value:any) {
    console.log('imagevalue', value)
    console.log('type', typeof value)

    this.vm.data=value; 
  }
 


  constructor(public vm: ViewModelService) { }
  ngOnInit() {
}
}
