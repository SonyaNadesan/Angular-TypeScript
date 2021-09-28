import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { KeyValuePair } from '../../KeyValuePair';

@Component({
  selector: 'CheckBox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent implements OnInit {

  @Input() checked: boolean = false;
  @Input() option: KeyValuePair<any, any>;

  @Output() onChangeEvent: EventEmitter<KeyValuePair<any, any>> = new EventEmitter<KeyValuePair<any, any>>();

  constructor() { }

  ngOnInit(): void {
  }

  onChange(value: KeyValuePair<any, any>){
    this.checked = !this.checked;

    this.onChangeEvent.emit(value);
  }

}
