import { Component, OnInit, ViewEncapsulation, Output, EventEmitter, Input, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ResizeService } from '../shared/services/resize.service';
import { Subscription } from 'rxjs';
import { MediaMatcher } from '@angular/cdk/layout';
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

    constructor(private resizeService: ResizeService,changeDetectorRef: ChangeDetectorRef, media: MediaMatcher)
    {
      
    this.resizeSubscription = this.resizeService.onResize$
    .subscribe(size => {
      this.containerHeight= size.innerHeight - 70;
      this.containerWidth= size.innerWidth;
    });

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    }
    fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);
    fillerContent = Array.from({length: 50}, () =>
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
     labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
     laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
     voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
     cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`);
    ngOnInit(): void {
        
    }
    ngOnDestroy(): void {
      if (this.resizeSubscription) {
        this.resizeSubscription.unsubscribe();
      }
      this.mobileQuery.removeListener(this._mobileQueryListener);

    }

}