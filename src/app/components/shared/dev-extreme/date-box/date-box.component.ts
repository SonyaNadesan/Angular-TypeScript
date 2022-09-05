import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SimpleDate } from 'src/app/models/SimpleDate';

@Component({
  selector: 'DateBox',
  templateUrl: './date-box.component.html',
  styleUrls: ['./date-box.component.css']
})
export class DateBoxComponent implements OnInit {

  @Input() label: string;

  selectedDate: Date = new Date();
  selectedDateParam: string;

  @Output() dateChangedEvent: EventEmitter<SimpleDate> = new EventEmitter<SimpleDate>();

  constructor() { }

  ngOnInit() {
    this.selectedDateParam = this.formatDate(this.selectedDate);

    let simpleDate = new SimpleDate();
    simpleDate.date = this.selectedDate;
    simpleDate.dateForQueryParam = this.selectedDateParam;

    this.dateChangedEvent.emit(simpleDate);
  }

  selectionChanged(event: any){
    let date = <Date>(event.value);

    let dateAsString = this.formatDate(date);

    this.selectedDate = date;

    this.selectedDateParam = dateAsString;

    let simpleDate = new SimpleDate();
    simpleDate.date = this.selectedDate;
    simpleDate.dateForQueryParam = this.selectedDateParam;

    this.dateChangedEvent.emit(simpleDate);
  }

  private formatDate(date: Date) {
    let yearAsString = date.getFullYear().toString();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    let monthAsString = month < 10 ? "0" + month.toString() : month.toString();
    let dayAsString = day < 10 ? "0" + day.toString() : day.toString();

    return yearAsString + "-" + monthAsString + "-" + dayAsString;
  }

}
