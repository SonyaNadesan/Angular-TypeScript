import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DxPivotGridComponent } from 'devextreme-angular';
import { SaveStateEvent } from '../../../../models/SaveStateEvent';
import { SaveStateStatus } from '../../../../models/SaveStateStatus';
import { DocumentObjectModelHelper } from '../../../../helpers/DocumentObjectModelHelper';
import { KeyValuePair } from 'src/app/models/KeyValuePair';
import { GridStateAndSharableStatus } from '../../../../models/GridStateAndSharableStatus';
import { SharableStatus } from '../../../../models/SharableStatus';

@Component({
  selector: 'PivotGrid',
  templateUrl: './pivot-grid.component.html',
  styleUrls: ['./pivot-grid.component.css']
})
export class PivotGridComponent implements OnInit {
  @ViewChild(DxPivotGridComponent, { static: false }) theGrid: DxPivotGridComponent;

  @Input() pivotGridId: string;
  @Input() allowSortingBySummary: boolean;
  @Input() allowSorting: boolean;
  @Input() allowFiltering: boolean;
  @Input() allowExpandAll: boolean;
  @Input() pivotGridHeight: number;
  @Input() showBorders: boolean;
  @Input() pivotGridDataSource: any;
  @Input() rowHeaderLayout: string;
  @Input() exportEnabled: boolean = true;
  @Input() fileName: string;
  @Input() fieldChooserAllowSearch: boolean = true;
  @Input() fieldChooserEnabled: boolean = true;
  @Input() showDataFields: boolean;
  @Input() showRowFields: boolean;
  @Input() showColumnFields: boolean;
  @Input() showFilterFields: boolean;
  @Input() allowFieldDragging: boolean;
  @Input() fieldPanelVisible: boolean = true;
  @Input() allowUsersToSwitchBetweenGridLayouts: boolean = true;
  @Input() allowUsersToShowHideColumns: boolean;
  @Input() allowCellNavigationUsingKeyboard: boolean;
  @Input() showConfigurationPanel: boolean;

  @Output() onContextMenuPreparingEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() onCellPreparedEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() onCellClickEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() gridStateChangeEvent: EventEmitter<GridStateAndSharableStatus> = new EventEmitter<GridStateAndSharableStatus>();
  @Output() hasLoadedEvent: EventEmitter<boolean> = new EventEmitter();

  gridState: any;

  private cellCount: number = 0;
  private cells: KeyValuePair<string, any>[] = [];
  private selectedCell: any;

  saveStateLog: SaveStateEvent[] = [];
  saveAsDefaultMessage: string;

  constructor() {
  }

  ngOnInit() {
    if (this.allowCellNavigationUsingKeyboard) {
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

    this.hasLoadedEvent.emit(true);
  }

  onCellPrepared(e) {
    this.cellCount = this.cellCount + 1;

    e.cellElement[0].id = this.cellCount.toString();

    this.cells.push(new KeyValuePair<string, any>(e.cellElement[0].id, e));

    let idAndValue = new KeyValuePair<string, number>(e.cellElement[0].id, e.cell.value);

    this.onCellPreparedEvent.emit(idAndValue);
  }

  onCellClick(e) {
    if (this.allowCellNavigationUsingKeyboard) {
      if (this.selectedCell) {
        let currentCell = this.cells.find(x => x.key == this.selectedCell[0].id).value;
        currentCell.cellElement.removeClass("selectedCell");
      }

      e.cellElement.addClass("selectedCell");

      this.selectedCell = e.cellElement;

      this.onCellClickEvent.emit(e);
    }

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

  setState(state: string){
    let stateObj = JSON.parse(state);
    this.theGrid.instance.getDataSource().state(stateObj);
  }
}