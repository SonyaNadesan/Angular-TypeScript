import { Any } from "./Any";
import { DateRangeRules } from "./DateRangeRules";
import { Future } from "./Future";
import { FutureAndPresent } from "./FutureAndPresent";
import { IDateRangeRule } from "./IDateRangeRule";
import { Past } from "./Past";
import { PastAndPresent } from "./PastAndPresent";

export class DateRangeRuleFactory {
    static getDateRangeRule(dateRangeRule: DateRangeRules): IDateRangeRule {
        switch(dateRangeRule){
            case DateRangeRules.Any:
                return new Any();
            case DateRangeRules.Past:
                return new Past();
            case DateRangeRules.PastAndPresent:
                return new PastAndPresent;
            case DateRangeRules.Future:
                return new Future();
            case DateRangeRules.FutureAndPresent:
                return new FutureAndPresent();
            default:
                return new Any();
        }
    }
}