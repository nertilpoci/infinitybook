import { Component, OnInit, ViewEncapsulation, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { ResizeService } from '../shared/services/resize.service';
import { Subscription } from 'rxjs';
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-board-container',
  templateUrl: './boardcontainer.component.html',
  styleUrls: ['./boardcontainer.component.scss']
})
export class BoardElementContainerComponent implements OnInit, OnDestroy {
     
    private resizeSubscription: Subscription;
    containerWidth:number = window.innerWidth;
    containerHeight:number = window.innerHeight - 50;
    showActions=false;
    constructor(private resizeService: ResizeService)
    {
      
    this.resizeSubscription = this.resizeService.onResize$
    .subscribe(size => {
      this.containerHeight= size.innerHeight - 50;
      this.containerWidth= size.innerWidth;
    });
    }
    ngOnInit(): void {
        
    }
    ngOnDestroy(): void {
      if (this.resizeSubscription) {
        this.resizeSubscription.unsubscribe();
      }
    }

}