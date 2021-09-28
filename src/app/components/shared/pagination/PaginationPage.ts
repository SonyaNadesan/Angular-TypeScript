export class PaginationPage{
    public pageNumber: number;
    public isCurrentPage: boolean;

    constructor(_number: number, _isCurrentPage: boolean){
        this.pageNumber = _number;
        this.isCurrentPage = _isCurrentPage;
    }
}