import { FromAndToDate } from "src/app/models/FromAndToDate";

export interface IDateRangeRule {
    validate(fromDate: Date, toDate: Date): FromAndToDate;
}