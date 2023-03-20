export interface IColumn {
    getColumn(): () => any;
}

export abstract class Column implements IColumn {
    protected dataType: string;

    abstract getColumn(): () => any;
}

export abstract class DataColumn extends Column {
    protected dataField: string;
    protected allowEditing: boolean;
    protected showInColumnChooser: boolean;
    protected caption: string;

    constructor(dataField: string, allowEditing: boolean, showInColumnChooser: boolean, caption: string = null) {
        super();
        this.dataField = dataField;
        this.allowEditing = allowEditing;
        this.showInColumnChooser = showInColumnChooser;
        this.caption = caption ? caption : dataField;
    }

    abstract applyLookupValues(lookupValues: any[], valueExpression: string, displayExpression: string): any;
}

export class LookupColumn<T extends DataColumn> implements IColumn {
    column: T;
    lookupValues: any[];
    valueExpression: string;
    displayExpression: string;

    constructor(column: T, lookupValues: any[], valueExpression: string, displayExpression: string) {
        this.column = column;
        this.lookupValues = lookupValues;
        this.valueExpression = valueExpression;
        this.displayExpression = displayExpression;
    }

    getColumn() {
        let column = <any>this;
        column["lookupValues"] = this.lookupValues;
        column["valueExpression"] = this.valueExpression;
        column["displayExpression"] = this.displayExpression;

        return column;
    }
}

export class StringColumn extends DataColumn {
    dataType = "string";

    constructor(dataField: string, allowEditing: boolean, showInColumnChooser: boolean, caption: string = null) {
        super(dataField, allowEditing, showInColumnChooser, caption);
    }

    getColumn() {
        return <any>this;
    }

    applyLookupValues(lookupValues: any[], valueExpression: string, displayExpression: string): any {
        return new LookupColumn<StringColumn>(this, lookupValues, valueExpression, displayExpression);
    }
}

export class DateColumn extends DataColumn {
    dataType = "date";
    private format: any;

    constructor(dataField: string, allowEditing: boolean, format: string, showInColumnChooser: boolean, caption: string = null) {
        super(dataField, allowEditing, showInColumnChooser, caption);

        this.format = { type: format };
    }

    getColumn() {
        return <any>this;
    }

    applyLookupValues(lookupValues: any[], valueExpression: string, displayExpression: string): any {
        return new LookupColumn<DateColumn>(this, lookupValues, valueExpression, displayExpression);
    }
}

export class NumericColumn extends DataColumn {
    dataType = "number";
    private formatType: any;
    private precision;

    constructor(dataField: string, allowEditing: boolean, showInColumnChooser: boolean, caption: string = null) {
        super(dataField, allowEditing, showInColumnChooser, caption);

        this.formatType = "fixedpoint";
        this.precision = 0;
    }

    setFormatTypeAndPrecision(formatType: string, precision: number){
        this.formatType = formatType;
        this.precision = precision;
    }

    getColumn() {
        return <any>this;
    }

    applyLookupValues(lookupValues: any[], valueExpression: string, displayExpression: string): any {
        return new LookupColumn<NumericColumn>(this, lookupValues, valueExpression, displayExpression);
    }
}

export class ButtonColumn extends Column {
    dataType = "button";
    private text: string;
    private icon: string;
    private hint: string;
    private onClick: (e: any) => void;

    constructor(text: string, icon: string, hint: string, onClick: (e: any) => void) {
        super();

        this.text = text;
        this.icon = icon;
        this.hint = hint;
        this.onClick = onClick;
    }

    getColumn() {
        return <any>this;
    }
}