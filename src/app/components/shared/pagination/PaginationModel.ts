export class PaginationModel<T>{
    itemsToDisplay: T[];
    pageSize: number;
    totalNumberOfResult: number;
    currentPage: number;
    numberOfPages: number;
    startPage: number;
    lastPage: number;
    formAction: string;
    formMethod: string;
    maxNumberOfPagesToShowOnEachRequest: number;
    moreParametersAndValues: [string[]];
}