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
import {MatDialogModule, MatBottomSheetModule, MAT_BOTTOM_SHEET_DEFAULT_OPTIONS, MatListModule, MatCardModule, MatSidenavModule, MatTreeModule} from '@angular/material';
import { BoardElementSettingsComponent } from './boardelementsettings/boardelementsettings.component';
import {MatMenuModule} from '@angular/material/menu';
import { ComponentListComponent } from './component-list/component-list.component';
import { AppWidgetService, WidgetService } from './shared/services/widget.service';
import {MatTabsModule} from '@angular/material/tabs';
import { BoardElementContainerComponent } from './boardcontainer/boardcontainer.component';
import { BoardListComponent } from './boardlist/boardlist.component';
import { ClarityModule } from "@clr/angular";
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    BoardElementContainerComponent,
    BoardComponent,
    PopupNodeComponent,
    BoardElementSettingsComponent,
    BoardElementComponent,
    DynamicContentComponent,
    ComponentListComponent,
    BoardListComponent
  ],
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
    MatDialogModule,
    MatMenuModule,
    MatBottomSheetModule,
    MatListModule,
    MatCardModule,
    MatTabsModule,
    MatSidenavModule,
    MatTreeModule,
    ClarityModule,
    FormsModule

    
  ],
  providers: [
    {provide: WidgetService, useClass: AppWidgetService},
    {provide: MAT_BOTTOM_SHEET_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}}
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    BoardComponent,
    BoardListComponent,
    BoardElementComponent,
    PopupNodeComponent,
    DynamicContentComponent,
    BoardElementSettingsComponent,
    BoardElementContainerComponent
  ],
  entryComponents : [
    BoardElementSettingsComponent,
    PopupNodeComponent,
    ComponentListComponent
  ]

})
export class CoreModule { }
