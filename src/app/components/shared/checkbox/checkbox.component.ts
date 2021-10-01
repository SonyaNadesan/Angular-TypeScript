import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TextValuePair } from '../../TextValuePair';

@Component({
  selector: 'CheckBox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent implements OnInit {

  @Input() checked: boolean = false;
  @Input() option: TextValuePair<any, any>;

  @Output() onChangeEvent: EventEmitter<TextValuePair<any, any>> = new EventEmitter<TextValuePair<any, any>>();

  constructor() { }

  ngOnInit(): void {
  }

  onChange(value: TextValuePair<any, any>){
    this.checked = !this.checked;

    this.onChangeEvent.emit(value);
  }
}
