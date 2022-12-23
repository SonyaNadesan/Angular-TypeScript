import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PageComponent } from './components/shared/pagination/page/page.component';
import { PagesComponent } from './components/shared/pagination/pages/pages.component';
import { PaginationComponent } from './components/shared/pagination/pagination/pagination.component';
import { NextButtonComponent } from './components/shared/pagination/next-button/next-button.component';
import { PreviousButtonComponent } from './components/shared/pagination/previous-button/previous-button.component';
import { DropDownComponent } from './components/shared/drop-down/drop-down/drop-down.component';
import { CheckboxesComponent } from './components/shared/checkboxes/checkboxes.component';
import { CheckboxComponent } from './components/shared/checkbox/checkbox.component';
import { RadiobuttonsComponent } from './components/shared/radiobuttons/radiobuttons.component';
import { TableComponent } from './components/shared/table/table.component';
import { DateBoxComponent } from './components/shared/dev-extreme/date-box/date-box.component';
import { DateRangeBoxComponent } from './components/shared/dev-extreme/date-range-box/date-range-box.component';
import { DxButtonModule, DxCheckBoxModule, DxDataGridModule, DxDateBoxModule, DxPivotGridModule, DxPopupModule, DxSelectBoxModule, DxTextBoxModule, DxTooltipModule } from 'devextreme-angular';
import { GlobalSearchForDxDataGridComponent } from './components/shared/dev-extreme/global-search-for-dx-data-grid/global-search-for-dx-data-grid.component';
import { DxoFieldPanelModule } from 'devextreme-angular/ui/nested';
import { PivotGridComponent } from './components/shared/dev-extreme/pivot-grid/pivot-grid.component';
import { DropDownListComponent } from './components/shared/dev-extreme/drop-down-list/drop-down-list.component';
import { GridGridStateFeaturesComponent } from './components/shared/dev-extreme/grid-grid-state-features/grid-grid-state-features.component';
import { GridFilterSetFeaturesComponent } from './components/shared/dev-extreme/grid-filter-set-features/grid-filter-set-features.component';
import { PivotGridSimpleConfigurationsComponent } from './components/shared/dev-extreme/pivot-grid-simple-configurations/pivot-grid-simple-configurations.component';
import { GridConfigurationsPanelComponent } from './components/shared/dev-extreme/grid-configurations-panel/grid-configurations-panel.component';
import { ExpandCollapsePanelComponent } from './components/shared/dev-extreme/expand-collapse-panel/expand-collapse-panel.component';
import "devextreme/integration/jquery";

@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
    PagesComponent,
    PaginationComponent,
    NextButtonComponent,
    PreviousButtonComponent,
    DropDownComponent,
    CheckboxesComponent,
    CheckboxComponent,
    RadiobuttonsComponent,
    TableComponent,
    DateBoxComponent,
    DateRangeBoxComponent,
    GlobalSearchForDxDataGridComponent,
    PivotGridComponent,
    DropDownListComponent,
    GridGridStateFeaturesComponent,
    GridFilterSetFeaturesComponent,
    PivotGridSimpleConfigurationsComponent,
    GridConfigurationsPanelComponent,
    ExpandCollapsePanelComponent
  ],
  imports: [
    BrowserModule,
    DxDateBoxModule,
    DxDataGridModule,
    DxPivotGridModule,
    DxButtonModule,
    DxoFieldPanelModule,
    DxSelectBoxModule,
    DxTooltipModule,
    DxPopupModule,
    DxCheckBoxModule,
    DxTextBoxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
