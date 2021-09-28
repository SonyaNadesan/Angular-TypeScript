import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { KeyValuePair } from '../../../KeyValuePair';

@Component({
  selector: 'DropDown',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.css']
})
export class DropDownComponent implements OnInit {

  @Input() label:string = "Please Select";
  @Input() items: KeyValuePair<any, any>[];

  @Output() onChangeEvent = new EventEmitter<KeyValuePair<any, any>>();

  public selectedValue: any;

  constructor() { }

  ngOnInit() {
  }

  onChange(value: any){
    this.selectedValue = value;
    let keyValue = this.items.find(x => x.key == this.selectedValue);
    this.label = keyValue?.value;
    this.onChangeEvent.emit(keyValue);
  }
}