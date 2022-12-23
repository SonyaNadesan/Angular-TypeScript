export interface IGrid{
    gridId: string;
    gridState: string;
    onCellPrepared(e);
    onCellClick(e);
    onContextMenuPreparing(event);
    saveState(state);
    setState(state);
}