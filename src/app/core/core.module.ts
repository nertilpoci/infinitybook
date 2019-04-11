import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board/board.component';
import { BoardElementComponent } from './boardelement/boardelement.component';
import { DynamicContentComponent } from './dynamiccontent/dynamiccontent.component'
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';
import {MatIconModule} from '@angular/material/icon';
import { AngularDraggableModule } from 'angular2-draggable';
import { OverlayModule } from '@angular/cdk/overlay';
@NgModule({
  declarations: [BoardComponent, BoardElementComponent, DynamicContentComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    DragDropModule,
    NgxPageScrollCoreModule,
    MatIconModule,
    AngularDraggableModule,
    OverlayModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [BoardComponent, BoardElementComponent, DynamicContentComponent],
  entryComponents : [ ]

})
export class CoreModule { }
