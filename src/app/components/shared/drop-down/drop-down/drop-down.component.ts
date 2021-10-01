import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { TextValuePair } from '../../../TextValuePair';

@Component({
  selector: 'DropDown',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.css']
})
export class DropDownComponent implements OnInit {

  @Input() label:string;
  @Input() items: TextValuePair<any, any>[];

  @Output() onChangeEvent = new EventEmitter<TextValuePair<any, any>>();

  public selectedItem: TextValuePair<any, any>;

  constructor() { }

  ngOnInit() {
  }

  onChange(textValuePair: TextValuePair<any, any>){
    this.selectedItem = textValuePair;
    this.label = textValuePair.value;
    this.onChangeEvent.emit(this.selectedItem);
  }
}