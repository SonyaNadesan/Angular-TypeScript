import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { Observable } from 'rxjs';
import { ArrayHelper } from 'src/app/helpers/ArrayHelper';
import { Cell } from 'src/app/models/Cell';
import { Columns } from 'src/app/models/Columns';
import { GridStateAndSharableStatus } from 'src/app/models/GridStateAndSharableStatus';
import { IGrid } from 'src/app/models/IGrid';
import { SaveStateEvent } from 'src/app/models/SaveStateEvent';
import { SaveStateStatus } from 'src/app/models/SaveStateStatus';
import { ServiceResponse } from 'src/app/models/ServiceResponse';
import { SharableStatus } from 'src/app/models/SharableStatus';

@Component({
  selector: 'DataGrid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.css']
})
export class DataGridComponent implements OnInit, IGrid {
  @ViewChild(DxDataGridComponent, { static: false }) theGrid: DxDataGridComponent;

  @Input() gridId: string;
  @Input() height: number = 1000;
  @Input() columnAutoWidth: boolean = true;
  @Input() showBorders: boolean = true;
  @Input() allowColumnReordering: boolean = true;
  @Input() rowAlternationEnabled: boolean = true;
  @Input() allowColumnResizing: boolean = true;
  @Input() dataSource: any;
  @Input() exportEnabled: boolean = true;
  @Input() editMode: string = "cell";
  @Input() allowAdding: boolean = false;
  @Input() allowUpdating: boolean = true;
  @Input() selectTextOnEditStart: boolean = true;
  @Input() showFilterRow: boolean = true;
  @Input() sortingMode: string = "multiple";
  @Input() headerFilterVisible: boolean = true;
  @Input() columns: Columns;
  @Input() columnChooserMode: string = "select";
  @Input() onCreateEvent: (e: any) => Observable<ServiceResponse<boolean>>;
  @Input() onUpdateEvent: (e: any) => Observable<ServiceResponse<boolean>>;
  @Input() onDeleteEvent: (e: any) => Observable<ServiceResponse<boolean>>;

  columnsList: any[] = [];
  gridState: any;
  saveStateLog: SaveStateEvent[] = [];
  gridModes: string[] = ['Copy Mode', 'Edit Mode'];
  selectedGridMode: string;
  copyByModes: string[] = ['ROW', 'COLUMN'];
  selectedCopyByMode: string;
  infoModalVisibility: boolean = false;

  @Output() onCellPreparedEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() onRowUpdatedEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() onEditorPreparingEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() onCellClickEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() onCellDblClickEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() gridStateChangeEvent: EventEmitter<GridStateAndSharableStatus> = new EventEmitter<GridStateAndSharableStatus>();
  @Output() hasLoadedEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  public columnChooserEnabled: boolean = true;
  public eventName: string = "";

  private cellCount: number = 0;
  private cells: Cell[] = [];
  private selectedCells: Cell[] = [];
  private keysPressed: string[] = [];
  private timeOutHandler: any;

  private numberOfColumns: number;
  onlyShowCopyMode: boolean;

  constructor() {
  }

  onContextMenuPreparing(event: any) {
    throw new Error('Method not implemented.');
  }

  ngOnInit() {
    window.addEventListener("keydown", (event) => {
      if (!this.allowUpdating) {
        if (this.keysPressed.findIndex(x => x == event.key) == -1) {
          this.keysPressed.push(event.key);
          this.copyRangeIfControlC();
        }
      }
    }, true);

    window.addEventListener("keyup", (event) => {
      if (!this.allowUpdating) {
        this.keysPressed = this.keysPressed.filter(x => x != event.key);
      }
    }, true);

    this.columnsList = this.columns.GetColumns();
    this.onlyShowCopyMode = this.columns.GetNumberOfEditableColumns() == 0;

    this.columnChooserEnabled = this.columnsList.filter(x => x.showInColumnChooser == true).length > 0;

    this.selectedGridMode = this.onlyShowCopyMode ? this.gridModes[0] : this.gridModes[1];
    this.selectedCopyByMode = this.copyByModes[1];

    this.hasLoadedEvent.emit(true);
  }

  onCellPrepared(e) {
    if (e.cellElement[0].role == "gridcell" && e.rowType == "data") {
      if (e.columnIndex == 0 && e.rowIndex == 0) {
        this.cellCount = 0;
        this.cells = [];
        this.selectedCells = [];
      }

      this.cellCount = this.cellCount + 1;

      e.cellElement[0].id = this.gridId + this.cellCount;

      let cell = new Cell(e.columnIndex, e.rowIndex, e.cellElement[0].id, e.displayValue);

      this.cells.push(cell);
    }
  }

  onCellClick(e) {
    if (!this.timeOutHandler) {
      this.timeOutHandler = setTimeout(() => {
        this.timeOutHandler = null;

        if (!this.allowUpdating) {
          let shouldAppend = this.keysPressed.findIndex(x => x == "Control") > -1;

          let cell = this.cells.find(x => x.columnIndex == e.columnIndex && x.rowIndex == e.rowIndex);

          this.cellClick(cell, shouldAppend);

          this.onCellClickEvent.emit(e);
        }
      }, 300);
    }
  }

  onCellDblClick(e) {
    clearTimeout(this.timeOutHandler);
    this.timeOutHandler = null;

    if (!this.allowUpdating) {
      let shouldAppend = this.keysPressed.findIndex(x => x == "Control") > -1;

      let cellsInColumnOrRow =  this.selectedCopyByMode == "ROW" ? this.cells.filter(x => x.rowIndex == e.rowIndex) 
                                : this.cells.filter(x => x.columnIndex == e.columnIndex) ;

      for (let i = 0; i < cellsInColumnOrRow.length; i++) {
        shouldAppend = i == 0 ? shouldAppend : true;

        this.cellClick(cellsInColumnOrRow[i], shouldAppend);
      }

      this.onCellDblClickEvent.emit(e);
    }
  }

  onSaving(event) {
    console.log(event);
    if(this.eventName == "Create_Complete"){
      console.log("adding to db");
      this.onCreateEvent(event.changes[0].data).subscribe(x => {
        this.setEditStatus("Save_Complete");
      });
    }else if(this.eventName == "Update_Complete"){
      console.log("updating against the db");
      this.onUpdateEvent(event.changes[0].data).subscribe(x => {
        this.setEditStatus("Save_Complete");
      });
    }else if(this.eventName == "Delete_Complete"){
      console.log("deleting against the db");
      this.onDeleteEvent(event.changes[0].key).subscribe(x => {
        this.setEditStatus("Delete_Complete");
      });
    }
  }

  setEditStatus(eventName) {
    this.eventName = (eventName);
    console.log(this.eventName);
  }

  onEditorPreparing(event) {

  }

  onRowPrepared(event) {
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

    let gridStateAndSharableStatus = new GridStateAndSharableStatus();
    gridStateAndSharableStatus.gridState = this.gridState;
    gridStateAndSharableStatus.sharable = sharable ? SharableStatus.YES : SharableStatus.NO_CHANGE;

    this.gridStateChangeEvent.emit(gridStateAndSharableStatus);
  }

  setState(state: string) {
    let stateObj = JSON.parse(state);
    this.cellCount = 0;
    this.numberOfColumns = stateObj.columns.filter(x => x.visible == true && x.name != "buttons").length;
    this.cells = [];
    this.selectedCells = [];
    this.theGrid.instance.state(stateObj);
  }

  onToggleBetweenCopyAndEditMode(e) {
    console.log(e);
    if (e.value == 'Copy Mode') {
      this.switchToCopyMode();
    } else if(e.value == 'Edit Mode') {
      this.switchToEditMode();
    }
  }

  onToggleCopyByMode(e) {
    console.log(e);
    if (e.value == 'ROW') {
      this.selectedCopyByMode = this.copyByModes[0];
    } else if(e.value == 'COLUMN') {
      this.selectedCopyByMode = this.copyByModes[1];
    }
  }

  toggleInfoModalVisibility(){
    this.infoModalVisibility = !this.infoModalVisibility;
  }

  private switchToCopyMode() {
    this.allowUpdating = false;
    this.selectedGridMode = this.gridModes[0];
    this.columnsList = this.columns.MakeAllReadonly().GetColumns();
    console.log(this.columns);
  }

  private switchToEditMode() {
    this.allowUpdating = true;
    this.selectedGridMode = this.gridModes[1];
    this.columnsList = this.columns.UseDefaultSettings().GetColumns();
    console.log(this.columns);

    this.keysPressed = [];
    this.selectedCells = [];

    for (let i = 0; i < this.selectedCells.length; i++) {
      let cell = this.selectedCells[i];

      document.getElementById(cell.id).classList.remove("selectedCell");
    }
  }

  private copyRangeIfControlC() {
    let cPressed = this.keysPressed.findIndex(x => x.toUpperCase() == "C") > -1;

    if (cPressed) {
      let controlPressed = this.keysPressed.findIndex(x => x == "Control") > -1;

      if (controlPressed) {
        let rowsToInclude = this.selectedCells.map(x => x.rowIndex).sort((a, b) => a - b);
        let rowsToIncludeWithoutDuplicated = rowsToInclude.filter((x, i, arr) => arr.indexOf(x) == i);
        let columnsToInclude = this.selectedCells.map(x => x.columnIndex).sort((a, b) => a - b);
        let columnsToIncludeWithoutDuplicated = columnsToInclude.filter((x, i, arr) => arr.indexOf(x) == i);

        let theArray: string[][] = [];

        if (rowsToIncludeWithoutDuplicated && columnsToIncludeWithoutDuplicated && rowsToIncludeWithoutDuplicated.length > 0 && columnsToIncludeWithoutDuplicated.length > 0) {
          rowsToIncludeWithoutDuplicated.forEach(row => {
            let newRow = [];

            let rowCells = this.selectedCells.filter(x => x.rowIndex == row);

            columnsToIncludeWithoutDuplicated.forEach(column => {
              let cell = rowCells.find(x => x.columnIndex == column);

              let cellValue = cell ? (cell.value ? cell.value : " ") : " ";

              newRow.push(cellValue);
            });

            theArray.push(newRow);
          });

          let textToCopy = ArrayHelper.MakeArrayCopyableToExcel(theArray, columnsToInclude.length, true, true);

          navigator.clipboard.writeText(textToCopy);
        }
      }
    }
  }

  private cellClick(theCell: Cell, shouldAppendToClipboard: boolean) {
    let newValue = " ";
    let clickedCellIndex = this.selectedCells.findIndex(x => theCell.columnIndex == x.columnIndex && theCell.rowIndex == x.rowIndex);
    let isCellAlreadySelectedd = clickedCellIndex > -1;

    if (theCell) {
      if (shouldAppendToClipboard && !isCellAlreadySelectedd) {
        newValue = theCell.value;
        document.getElementById(theCell.id).classList.add("selectedCell");
        this.selectedCells.push(theCell);
      } else if (shouldAppendToClipboard && isCellAlreadySelectedd) {
        document.getElementById(theCell.id).classList.remove("selectedCell");
        this.selectedCells.splice(clickedCellIndex, 1);
      } else if (!shouldAppendToClipboard && !isCellAlreadySelectedd) {
        newValue = theCell.value;
        this.selectedCells.forEach(x => {
          document.getElementById(x.id).classList.remove("selectedCell");
        });
        document.getElementById(theCell.id).classList.add("selectedCell");
        this.selectedCells = [theCell];
      } else if (!shouldAppendToClipboard && isCellAlreadySelectedd) {
        //document.getElementById(theCell.id).classList.remove("selectedCell");
        this.selectedCells.forEach(x => {
          document.getElementById(x.id).classList.remove("selectedCell");
        });
        this.selectedCells = [];
      }
    }
  }
}