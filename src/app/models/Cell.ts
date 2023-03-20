export interface ICell{
    columnIndex: number;
    rowIndex: number;
    value: string;
}

export class Cell implements ICell {
    columnIndex: number;
    rowIndex: number;
    value: string;
    id: string;

    constructor(columnIndex: number, rowIndex: number, id: string, value: string) {
        this.columnIndex = columnIndex;
        this.rowIndex = rowIndex;
        this.id = id;
        this.value = value;
    }
}