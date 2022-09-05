import { SimpleDate } from "../models/SimpleDate";

export class DateHelper{
    static toSimpleDate(date: Date){
        let simpleDate = new SimpleDate();
        simpleDate.date = date;
        
        let month = date.getMonth();
        let monthAsString = month < 10 ? "0" + month : month;

        let day = date.getDate();
        let dateAsString = day < 10 ? "0" + day : month;

        simpleDate.dateForQueryParam = date.getFullYear() + "-" + monthAsString + "-" + dateAsString;
        return simpleDate;
    }

    static isFromDatePriorToToDate(fromDate: Date, toDate: Date): boolean{
        return fromDate <= toDate;
    }
}