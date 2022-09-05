import { DateRangeRules } from "../services/DateRange/Rules/DateRangeRules";
import { SimpleDate } from "./SimpleDate";

export class FromAndToDate {
    private dateRangeRule: DateRangeRules;
    fromDate: SimpleDate;
    toDate: SimpleDate;
    message: string = "";
    isValid: boolean;

    constructor(rule: DateRangeRules) {
        this.dateRangeRule = rule;
    }
}