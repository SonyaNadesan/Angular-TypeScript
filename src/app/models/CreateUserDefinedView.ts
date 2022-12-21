export class CreateUserDefinedView{
    viewName: string;
    queryParameters: string;
    gridState: string;
    onSuccess: () => void;
    onError: () => void;
}