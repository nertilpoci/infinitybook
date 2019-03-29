import { Component, OnInit, Inject } from '@angular/core';
import { PageScrollService } from 'ngx-page-scroll-core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private pageScrollService: PageScrollService,
     @Inject(DOCUMENT) private document: any) { }

  ngOnInit() {
    console.log(this.document)
  }

  dragMoved(data:any){
    console.log(this.document)
    this.pageScrollService.scroll({
      document: this.document,
      scrollTarget: '.anchor',
      verticalScrolling: false,
    });
  }

}
