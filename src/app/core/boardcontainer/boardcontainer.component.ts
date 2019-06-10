import { Component, OnInit, ViewEncapsulation, Output, EventEmitter, Input, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ResizeService } from '../shared/services/resize.service';
import { Subscription } from 'rxjs';
import { MediaMatcher } from '@angular/cdk/layout';
import { ClrSelectedState } from '@clr/angular';
import { FormGroup, FormBuilder } from '@angular/forms';
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-board-container',
  templateUrl: './boardcontainer.component.html',
  styleUrls: ['./boardcontainer.component.scss']
})
export class BoardElementContainerComponent implements OnInit, OnDestroy {
     
    private resizeSubscription: Subscription;
    containerWidth:number = window.innerWidth;
    containerHeight:number = window.innerHeight - 70;
    showActions=false;
    private _mobileQueryListener: () => void;
    mobileQuery: MediaQueryList;
    options: FormGroup;

    constructor(private fb:FormBuilder, private resizeService: ResizeService,changeDetectorRef: ChangeDetectorRef, media: MediaMatcher)
    {
      
    this.resizeSubscription = this.resizeService.onResize$
    .subscribe(size => {
      this.containerHeight= size.innerHeight - 70;
      this.containerWidth= size.innerWidth;
    });

    this.options = fb.group({
        bottom: 0,
        fixed: true,
        top: 0
      });
  
    }
    
    ngOnInit(): void {
        
    }
    ngOnDestroy(): void {
      if (this.resizeSubscription) {
        this.resizeSubscription.unsubscribe();
      }
      this.mobileQuery.removeListener(this._mobileQueryListener);

    }
  
}