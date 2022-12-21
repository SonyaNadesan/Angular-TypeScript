export class ServiceResponse<TResult>{
    result: TResult;
    errorMessage: string;
    isValid: boolean;
}