import { Component, Inject, OnInit, Input } from '@angular/core';

import { ImageContext} from '../model';

@Component({
  selector: 'lib-board-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent  implements OnInit  {

  context: ImageContext
  ngOnInit() {
}
}
