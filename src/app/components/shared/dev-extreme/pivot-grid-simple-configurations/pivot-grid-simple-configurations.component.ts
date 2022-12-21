import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CookieHelper } from 'src/app/helpers/CookieHelper';
import { KeyValuePair } from 'src/app/models/KeyValuePair';
import { PivotGridComponent } from '../pivot-grid/pivot-grid.component';

@Component({
  selector: 'PivotGridSimpleConfigurations',
  templateUrl: './pivot-grid-simple-configurations.component.html',
  styleUrls: ['./pivot-grid-simple-configurations.component.css']
})
export class PivotGridSimpleConfigurationsComponent implements OnInit {

  @Input() pivotGrid: PivotGridComponent;
  @Input() allowUsersToSwitchBetweenGridLayouts: boolean = true;
  @Input() allowUsersToShowHideColumns: boolean = true;

  standardGridLayout: KeyValuePair<string, string> = new KeyValuePair('standard', 'Standard');
  treeGridLayout: KeyValuePair<string, string> = new KeyValuePair('tree', 'Tree');
  useTreeLayout: boolean = true;

  gridLayoutOptions: KeyValuePair<string, string>[] = [
    this.standardGridLayout,
    this.treeGridLayout
  ];

  fieldPanelVisible: boolean = true;

  @Output() useTreeLayoutEvent: EventEmitter<boolean> = new EventEmitter();
  @Output() showColumnsEvent: EventEmitter<boolean> = new EventEmitter();

  saveLayoutAndColumnsConfigMessage: string;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    let defaultUseTreeLayout = CookieHelper.getCookie(`${this.pivotGrid.pivotGridId}-useTreeLayout`, "true");
    this.useTreeLayout = defaultUseTreeLayout.toLowerCase() == "true";

    let defaultShowColumns = CookieHelper.getCookie(`${this.pivotGrid.pivotGridId}-defaultShowColumns`, "true");
    this.fieldPanelVisible = defaultShowColumns.toLocaleLowerCase() == "true";

    this.pivotGrid.rowHeaderLayout = this.useTreeLayout ? "tree" : "standard";
    this.pivotGrid.fieldPanelVisible = this.fieldPanelVisible;

    this.useTreeLayoutEvent.emit(this.useTreeLayout);
    this.showColumnsEvent.emit(this.fieldPanelVisible);
  }

  useTreeLayoutChange(event) {
    this.useTreeLayout = event.value;
    this.saveLayoutAndColumnsConfigMessage = "";
    this.pivotGrid.rowHeaderLayout = this.useTreeLayout ? "tree" : "standard";
    this.useTreeLayoutEvent.emit(this.useTreeLayout);
  }

  onShowColumnsChange(event) {
    this.fieldPanelVisible = event.value;
    this.saveLayoutAndColumnsConfigMessage = "";
    alert(this.fieldPanelVisible);
    this.pivotGrid.fieldPanelVisible = this.fieldPanelVisible;
    this.showColumnsEvent.emit(this.fieldPanelVisible);
  }

  saveAsDefaultGridConfig() {
    CookieHelper.setCookie(`${this.pivotGrid.pivotGridId}-useTreeLayout`, this.useTreeLayout);
    CookieHelper.setCookie(`${this.pivotGrid.pivotGridId}-defaultShowColumns`, this.fieldPanelVisible);
    this.saveLayoutAndColumnsConfigMessage = "Saved!";
  }

}