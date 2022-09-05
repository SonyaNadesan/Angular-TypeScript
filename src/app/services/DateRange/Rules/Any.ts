import { FromAndToDate } from "src/app/models/FromAndToDate";
import { BaseDateRangeRule } from "./BaseDateRangeRules";
import { DateRangeRules } from "./DateRangeRules";
import { IDateRangeRule } from "./IDateRangeRule";

export class Any extends BaseDateRangeRule implements IDateRangeRule {
    validate(fromDate: Date, toDate: Date): FromAndToDate {
        return this.basicValidate(fromDate, toDate, DateRangeRules.Any);
    }
}