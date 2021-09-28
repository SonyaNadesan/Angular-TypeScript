import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { KeyValuePair } from '../../KeyValuePair';

@Component({
  selector: 'CheckBoxes',
  templateUrl: './checkboxes.component.html',
  styleUrls: ['./checkboxes.component.css']
})
export class CheckboxesComponent implements OnInit {

  @Input() label: string;
  @Input() items: KeyValuePair<any, any>[];

  @Output() onChangeEvent: EventEmitter<KeyValuePair<any, any>[]> = new EventEmitter<KeyValuePair<any, any>[]>();
  
  selectedValues:KeyValuePair<any, any>[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  onChange(event: KeyValuePair<any, any>){
    let index = this.selectedValues.indexOf(event);

    if(index > -1){
      this.selectedValues.splice(index, 1);
    }else{
      this.selectedValues.push(event);
    }

    this.onChangeEvent.emit(this.selectedValues);
  }
}
