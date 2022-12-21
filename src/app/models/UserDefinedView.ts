export class UserDefinedView{
    id: number;
    viewName: string;
    isDefault: boolean;
    includesGridState: boolean;
    includesFilterSet: boolean;
    queryParameter: string;
    gridState: string;
    belongsToCurrentUser: boolean;
}