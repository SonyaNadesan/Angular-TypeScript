import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DxPivotGridComponent } from 'devextreme-angular';
import { SaveStateEvent } from 'src/app/models/SaveStateEvent';
import { SaveStateStatus } from 'src/app/models/SaveStateStatus';
import { DocumentObjectModelHelper } from 'src/app/helpers/DocumentObjectModelHelper';
import { SharableStatus } from 'src/app/models/SharableStatus';
import { GridStateAndSharableStatus } from 'src/app/models/GridStateAndSharableStatus';
import { KeyValuePair } from 'src/app/models/KeyValuePair';
import 'devextreme/integration/jquery';

@Component({
  selector: 'PivotGrid',
  templateUrl: './pivot-grid.component.html',
  styleUrls: ['./pivot-grid.component.css']
})
export class PivotGridComponent implements OnInit {
  @ViewChild(DxPivotGridComponent, { static: false }) theGrid: DxPivotGridComponent;

  @Input() pivotGridId: string = "pivotGrid";
  @Input() allowSortingBySummary: boolean = true;
  @Input() allowSorting: boolean = true;
  @Input() allowFiltering: boolean = true;
  @Input() allowExpandAll: boolean = true;
  @Input() pivotGridHeight: number = 500;
  @Input() showBorders: boolean = true;
  @Input() pivotGridDataSource: any = [];
  @Input() rowHeaderLayout: string = "standard";
  @Input() exportEnabled: boolean = true;
  @Input() fileName: string = "export";
  @Input() fieldChooserAllowSearch: boolean = true;
  @Input() fieldChooserEnabled: boolean = true;
  @Input() showDataFields: boolean = true;
  @Input() showRowFields: boolean = true;
  @Input() showColumnTotals: boolean = true;
  @Input() showRowTotals: boolean = true;
  @Input() showRowGrandTotals: boolean = true;
  @Input() showColumnGrandTotals: boolean = true;
  @Input() showColumnFields: boolean = true;
  @Input() showFilterFields: boolean = true;
  @Input() allowFieldDragging: boolean = true;
  @Input() fieldPanelVisible: boolean = true;

  @Output() onContextMenuPreparingEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() onCellPreparedEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() onCellClickEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() gridStateChangeEvent: EventEmitter<GridStateAndSharableStatus> = new EventEmitter<GridStateAndSharableStatus>();

  gridState: any;

  private cellCount: number = 0;
  private cells: KeyValuePair<string, any>[] = [];
  private selectedCell: any;

  saveStateLog: SaveStateEvent[] = [];

  constructor() { }

  ngOnInit() {
    window.addEventListener("keydown", (event) => {
      if (this.selectedCell) {
        console.log(this.selectedCell);

        let selectedCell = this.selectedCell[0];

        let newSelectedCellId = DocumentObjectModelHelper.getSelectedCellOnTableKeyboardNavigation(event, selectedCell);
        let e = this.cells.find(x => x.key == newSelectedCellId).value;
        this.onCellClick(e);
      }
    }, true);
  }

  onCellPrepared(e) {
    this.cellCount = this.cellCount + 1;

    e.cellElement[0].id = this.cellCount.toString();

    this.cells.push(new KeyValuePair<string, any>(e.cellElement[0].id, e));

    let idAndValue = new KeyValuePair<string, number>(e.cellElement[0].id, e.cell.value);

    this.onCellPreparedEvent.emit(idAndValue);
  }

  onCellClick(e) {
    if (this.selectedCell) {
      let currentCell = this.cells.find(x => x.key == this.selectedCell[0].id).value;
      currentCell.cellElement.removeClass("selectedCell");
    }

    e.cellElement.addClass("selectedCell");

    this.selectedCell = e.cellElement;

    this.onCellClickEvent.emit(e);
  }

  onContextMenuPreparing(event) {
    this.onContextMenuPreparingEvent.emit(event);
  }

  saveState = (state) => {
    let sharable = false;

    //only sharable if loaded using viewId
    if (this.saveStateLog && this.saveStateLog.length > 0) {
      let lastChange = this.saveStateLog[this.saveStateLog.length - 1];

      if (lastChange.status == SaveStateStatus.INCOMPLETE_STATE_CHANGED_VIA_VIEW_ID) {
        sharable = true;

        let saveStatus = new SaveStateEvent();
        saveStatus.message = lastChange.message;
        saveStatus.status = SaveStateStatus.COMPLETE

        this.saveStateLog.push(saveStatus);
      } else if (lastChange.status == SaveStateStatus.INCOMPLETE_UNCHANGED) {
        let saveStatus = new SaveStateEvent();
        saveStatus.message = lastChange.message;
        saveStatus.status = SaveStateStatus.COMPLETE

        this.saveStateLog.push(saveStatus);
      }
    }

    this.gridState = JSON.stringify(state);

    console.log(this.saveStateLog);

    let gridStateAndSharableStatus = new GridStateAndSharableStatus();
    gridStateAndSharableStatus.gridState = this.gridState;
    gridStateAndSharableStatus.sharable = sharable ? SharableStatus.YES : SharableStatus.NO_CHANGE;

    this.gridStateChangeEvent.emit(gridStateAndSharableStatus);
  }
}