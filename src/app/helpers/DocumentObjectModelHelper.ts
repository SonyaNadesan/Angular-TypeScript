export class DocumentObjectModelHelper {
    public static findFirstOuterElemetsWithSpecifiedTagName(tagName: string, element: HTMLElement) {
        let result: HTMLElement = null;
        let parent = element.parentElement;
        tagName = tagName.toLowerCase();

        while (parent && parent.tagName && parent.tagName.toLowerCase() != tagName) {
            parent = parent.parentElement;
        }

        if (parent && parent.tagName && parent.tagName.toLowerCase() == tagName) {
            result = parent;
        }

        return parent;
    }

    public static getChildrenAsArray(element: HTMLElement) {
        return Array.from(element.children);
    }

    public static getSelectedCellOnTableKeyboardNavigation(e, fromCell: HTMLElement) {
        let cellId: string = null;

        let arrowKeys = ["ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown"];
        let indexOfKeyPressed = arrowKeys.findIndex(x => x == e.key);

        if (indexOfKeyPressed > -1) {
            if (indexOfKeyPressed == 0) {
                let row = DocumentObjectModelHelper.findFirstOuterElemetsWithSpecifiedTagName("tr", fromCell);
                let cellsInRow = DocumentObjectModelHelper.getChildrenAsArray(row);
                let indexOfSelectedCellInParent = cellsInRow.findIndex(x => x.id == fromCell.id);

                if (indexOfSelectedCellInParent > 0) {
                    cellId = cellsInRow[indexOfSelectedCellInParent - 1].id;
                }
            } else if (indexOfKeyPressed == 1) {
                let row = DocumentObjectModelHelper.findFirstOuterElemetsWithSpecifiedTagName("tr", fromCell);
                let cellsInRow = DocumentObjectModelHelper.getChildrenAsArray(row);
                let indexOfSelectedCellInParent = Array.from(cellsInRow).findIndex(x => x.id == fromCell.id);
                let gridRows = row.parentElement.children;
                let indexOfRowInGrid = Array.from(gridRows).findIndex(x => x == row);
                let rowAbove = gridRows[indexOfRowInGrid - 1];
                let cellInRowAbove = rowAbove.children[indexOfSelectedCellInParent];
                cellId = cellInRowAbove.id;
            } else if (indexOfKeyPressed == 2) {
                let row = DocumentObjectModelHelper.findFirstOuterElemetsWithSpecifiedTagName("tr", fromCell);
                let cellsInRow = DocumentObjectModelHelper.getChildrenAsArray(row);
                let indexOfSelectedCellInParent = cellsInRow.findIndex(x => x.id == fromCell.id);

                if (indexOfSelectedCellInParent < cellsInRow.length - 1) {
                    cellId = cellsInRow[indexOfSelectedCellInParent + 1].id;
                }
            } else if (indexOfKeyPressed == 3) {
                let row = DocumentObjectModelHelper.findFirstOuterElemetsWithSpecifiedTagName("tr", fromCell);
                let cellsInRow = DocumentObjectModelHelper.getChildrenAsArray(row);
                let indexOfSelectedCellInParent = cellsInRow.findIndex(x => x.id == fromCell.id);

                let gridRows = row.parentElement.children;
                let indexOfRowInGrid = Array.from(gridRows).findIndex(x => x == row);
                let rowBelow = gridRows[indexOfRowInGrid + 1];
                let cellInRowBelow = rowBelow.children[indexOfSelectedCellInParent];
                cellId = cellInRowBelow.id;
            }
        }

        return cellId;
    }
}