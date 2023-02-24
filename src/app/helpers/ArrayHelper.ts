export class ArrayHelper {
    public static MakeArrayCopyableToExcel(theArray: string[][], fieldCount: number, ignoreEmptyColumns: boolean = true, ignoreEmptyRows: boolean = true) {
        let allColumns: number[] = [];
        let columnsToInclude: number[] = [];

        for (let i = 0; i < fieldCount; i++) {
            allColumns.push(i);
        }

        theArray.forEach(element => {
            for (let i = 0; i < element.length; i++) {
                if (!ignoreEmptyColumns || (ignoreEmptyColumns && element[i] != " ")) {
                    let indexInColumnsToInclude = columnsToInclude.findIndex(x => x == i);

                    if (indexInColumnsToInclude == -1) {
                        columnsToInclude.push(i);
                    }
                }
            }
        });

        columnsToInclude = columnsToInclude.sort((a, b) => a - b);

        let selectionForCopyWithoutEmptyColumns: string[][] = [];

        theArray.forEach(element => {
            let row = [];

            columnsToInclude.forEach(x => {
                let cellValue = element[x] ? element[x] : " ";
                row.push(cellValue);
            });

            let isRowEmpty = row.filter(x => x == " ").length == row.length;

            if(!ignoreEmptyColumns || (ignoreEmptyRows && !isRowEmpty)){
                selectionForCopyWithoutEmptyColumns.push(row);
            }
        });

        console.log("removing empty columns...")
        console.log(selectionForCopyWithoutEmptyColumns);

        let textToCopy = selectionForCopyWithoutEmptyColumns
            .map(row => row.join("\t"))
            .join("\n");

        console.log(textToCopy);

        return textToCopy;
    }
}