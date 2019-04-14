import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';
import { WidgetService } from '../shared/services/widget.service';
import { IWidget } from 'ibcommon-lib';

@Component({
  selector: 'app-component-list',
  templateUrl: './component-list.component.html',
  styleUrls: ['./component-list.component.scss']
})
export class ComponentListComponent implements OnInit {
  widgets: IWidget[] = [];
  constructor(private sheetRef:MatBottomSheetRef<ComponentListComponent>, private widgetService: WidgetService ) { }

  close(){
    
  }
  chooseWidget(widget: IWidget){
    this.sheetRef.dismiss(widget)
  }
  ngOnInit() {
    this.widgets = this.widgetService.getWidgets();
  }

}
