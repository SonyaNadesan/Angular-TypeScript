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
import dxDateBox from 'devextreme/ui/date_box';
import { DxDateBoxModule } from 'devextreme-angular';

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
    DateRangeBoxComponent
  ],
  imports: [
    BrowserModule,
    DxDateBoxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
