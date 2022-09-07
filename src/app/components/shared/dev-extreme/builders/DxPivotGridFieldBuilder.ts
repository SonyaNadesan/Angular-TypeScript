export class PivotGridFieldBuilder{
    private field: any = {};

    constructor(dataField: string){
        this.field["dataField"] = dataField;
    }

    setDataType(dataType: string){
        this.field["dataType"] = dataType;
        return this;
    }

    setArea(area: string){
        this.field["area"] = area;
        return this;
    }

    setWidth(width: number){
        this.field["width"] = width;
        return this;
    }

    setCaption(caption: string){
        this.field["caption"] = caption;
        return this;
    }

    setSummaryType(summaryType: string){
        this.field["summaryType"] = summaryType;
        return this;
    }

    setFormat(format: any){
        this.field["format"] = format;
        return this;
    }

    customizeText(method:(cellInfo: any) => string){
        this.field.customizeText = method;
        return this;
    }

    expand(expand: boolean = true){
        this.field["expanded"] = expand;
        return this;
    }

    build(){
        return this.field;
    }
}