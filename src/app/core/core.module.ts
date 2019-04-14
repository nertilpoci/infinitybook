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
import { MaterialDesignFrameworkModule, Bootstrap4FrameworkModule } from 'angular6-json-schema-form';
import { PopupNodeComponent } from './popupnode/popupnode.component';
import {MatDialogModule} from '@angular/material';
import { BoardElementSettingsComponent } from './boardelementsettings/boardelementsettings.component';

@NgModule({
  declarations: [BoardComponent,PopupNodeComponent,BoardElementSettingsComponent, BoardElementComponent, DynamicContentComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    DragDropModule,
    NgxPageScrollCoreModule,
    MatIconModule,
    AngularDraggableModule,
    OverlayModule,
    MaterialDesignFrameworkModule,
    Bootstrap4FrameworkModule,
    MatDialogModule
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [BoardComponent, BoardElementComponent, PopupNodeComponent, DynamicContentComponent,BoardElementSettingsComponent],
  entryComponents : [ BoardElementSettingsComponent,PopupNodeComponent]

})
export class CoreModule { }
