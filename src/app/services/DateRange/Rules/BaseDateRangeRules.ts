import { DateHelper } from "src/app/helpers/DateHelper";
import { FromAndToDate } from "src/app/models/FromAndToDate";
import { DateRangeRules } from "./DateRangeRules";

export class BaseDateRangeRule{
    protected basicValidate(fromDate: Date, toDate: Date, dateRangeRule: DateRangeRules): FromAndToDate{
        let fromSimpleDate = DateHelper.toSimpleDate(fromDate);
        let toSimpleDate = DateHelper.toSimpleDate(toDate);

        let fromAndToDate = new FromAndToDate(dateRangeRule);
        fromAndToDate.fromDate = fromSimpleDate;
        fromAndToDate.toDate = toSimpleDate;

        if(!DateHelper.isFromDatePriorToToDate(fromDate, toDate)){
            fromAndToDate.isValid = false;
            fromAndToDate.message = "From Date must be prior to To Date.";
            return fromAndToDate;
        }

        fromAndToDate.isValid = true;
        return fromAndToDate;
    }
}