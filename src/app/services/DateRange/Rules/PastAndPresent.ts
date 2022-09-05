import { FromAndToDate } from "src/app/models/FromAndToDate";
import { BaseDateRangeRule } from "./BaseDateRangeRules";
import { DateRangeRules } from "./DateRangeRules";
import { IDateRangeRule } from "./IDateRangeRule";

export class PastAndPresent extends BaseDateRangeRule implements IDateRangeRule {
    validate(fromDate: Date, toDate: Date): FromAndToDate {
        let fromAndToDate = this.basicValidate(fromDate, toDate, DateRangeRules.PastAndPresent);

        if(!fromAndToDate.isValid){
            return fromAndToDate;
        }

        let currentDate = new Date();

        if(fromDate > currentDate || toDate > currentDate){
            fromAndToDate.isValid = false;
            fromAndToDate.message = "Both dates must be in the past or set to the current date.";
            return fromAndToDate;
        }

        fromAndToDate.isValid = true;
        return fromAndToDate;
    }
}