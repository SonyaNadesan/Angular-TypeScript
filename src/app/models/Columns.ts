import { IColumn, StringColumn } from "./Column";

export class Columns {
    columnList: any[];
    originalColumnList: any[];
    showDeleteColumn: boolean;
    originalShowDeleteColumn: boolean;

    constructor(showDeleteColumn: boolean = false) {
        this.columnList = [];
        this.originalColumnList = [];
        this.showDeleteColumn = showDeleteColumn;
        this.originalShowDeleteColumn = showDeleteColumn;
    }

    AddColumn(column: IColumn): Columns {
        let c = column.getColumn();
        this.columnList.push(c);
        this.originalColumnList.push(JSON.stringify(c));

        return this;
    }

    MakeAllReadonly() {
        let columnList = [];

        this.showDeleteColumn = false;
        
        console.log("marking as read-only...");
        
        this.columnList.forEach((x, i) => {
            let replacement: any;

            if(x.lookupValues){
                replacement = x;
                replacement.column.allowEditing = false;
            }else{
                replacement = x;
                replacement.allowEditing = false;
            }

            columnList.push(replacement);
        });

        this.columnList = columnList;
        console.log(this.columnList);

        return this;
    }

    UseDefaultSettings() {
        let columnList = [];
        
        this.originalColumnList.forEach((x, i) => {
            columnList.push(JSON.parse(x));
        });

        this.columnList = columnList;
        console.log(this.columnList);

        this.showDeleteColumn = this.originalShowDeleteColumn;

        return this;
    }

    GetColumns() {
        return this.columnList;
    }

    GetNumberOfEditableColumns(): number {
        let editableColumnCount = 0;

        this.columnList.forEach((x, i) => {
            let column = x;

            if (x.lookupValues) {
                column = x.column;
            }

            if (column.allowEditing) {
                editableColumnCount = editableColumnCount + 1;
            }
        });

        return editableColumnCount;
    }
}