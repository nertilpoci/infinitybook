import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';

@Component({
  selector: 'app-component-list',
  templateUrl: './component-list.component.html',
  styleUrls: ['./component-list.component.scss']
})
export class ComponentListComponent implements OnInit {

  constructor(private sheetRef:MatBottomSheetRef<ComponentListComponent> ) { }

  close(){
    this.sheetRef.dismiss({test:'test'})
  }
  ngOnInit() {
  }

}
