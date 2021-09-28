import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { KeyValuePair } from '../../KeyValuePair';

@Component({
  selector: 'RadioButtons',
  templateUrl: './radiobuttons.component.html',
  styleUrls: ['./radiobuttons.component.css']
})
export class RadiobuttonsComponent implements OnInit {

  @Input() label:string;
  @Input() items: KeyValuePair<any, any>[];
  @Input() selectedValue: KeyValuePair<any, any>;
  @Input() radioButtonGroupName: string;

  @Output() onChangeEvent: EventEmitter<KeyValuePair<any, any>> = new EventEmitter<KeyValuePair<any, any>>();

  constructor() { }

  ngOnInit(): void {
  }

  onChange(item: KeyValuePair<any, any>){
    this.selectedValue = item;

    this.onChangeEvent.emit(this.selectedValue);
  }
}
