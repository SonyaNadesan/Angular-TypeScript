import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FromAndToDate } from 'src/app/models/FromAndToDate';
import { SimpleDate } from 'src/app/models/SimpleDate';
import { DateRangeRuleFactory } from 'src/app/services/DateRange/Rules/BaseDateRangeRuleFactory';
import { DateRangeRules } from 'src/app/services/DateRange/Rules/DateRangeRules';
import { IDateRangeRule } from 'src/app/services/DateRange/Rules/IDateRangeRule';

@Component({
  selector: 'DateRangeBox',
  templateUrl: './date-range-box.component.html',
  styleUrls: ['./date-range-box.component.css']
})
export class DateRangeBoxComponent implements OnInit {

  @Input() dateRangeRule: DateRangeRules;

  fromAndToDate: FromAndToDate;

  @Output() dateRangeChangeEvent: EventEmitter<FromAndToDate> = new EventEmitter<FromAndToDate>();

  dateRangeRuleToUse: IDateRangeRule;

  constructor() { }

  ngOnInit() {
    this.fromAndToDate = new FromAndToDate(this.dateRangeRule);
    this.dateRangeRuleToUse = DateRangeRuleFactory.getDateRangeRule(this.dateRangeRule);
    this.fromAndToDate = this.dateRangeRuleToUse.validate(new Date(), new Date());
  }

  fromDateChanged(event: SimpleDate){
    let fromAndToDate = this.dateRangeRuleToUse.validate(event.date, this.fromAndToDate.toDate.date);
    this.setFromAndToDate(fromAndToDate);
    this.dateRangeChangeEvent.emit(this.fromAndToDate);
  }

  toDateChanged(event: SimpleDate){
    let fromAndToDate = this.dateRangeRuleToUse.validate(this.fromAndToDate.fromDate.date, event.date);
    this.setFromAndToDate(fromAndToDate);
    this.dateRangeChangeEvent.emit(this.fromAndToDate);
  }

  private setFromAndToDate(fromAndToDate: FromAndToDate){
    this.fromAndToDate.fromDate = fromAndToDate.fromDate;
    this.fromAndToDate.toDate = fromAndToDate.toDate;
    this.fromAndToDate.isValid = fromAndToDate.isValid;
    this.fromAndToDate.message = fromAndToDate.message;
  }
}
