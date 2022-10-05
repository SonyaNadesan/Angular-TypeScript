import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DateHelper } from 'src/app/helpers/DateHelper';
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
    let simpleDate = DateHelper.toSimpleDate(this.selectedDate);

    this.selectedDateParam = simpleDate.dateForQueryParam;

    this.dateChangedEvent.emit(simpleDate);
  }

  selectionChanged(event: any){
    this.selectedDate = <Date>(event.value);

    let simpleDate = DateHelper.toSimpleDate(this.selectedDate);

    this.selectedDateParam = simpleDate.dateForQueryParam;

    this.dateChangedEvent.emit(simpleDate);
  }

}
