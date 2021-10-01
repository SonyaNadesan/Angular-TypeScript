import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TextValuePair } from '../../TextValuePair';

@Component({
  selector: 'CheckBoxes',
  templateUrl: './checkboxes.component.html',
  styleUrls: ['./checkboxes.component.css']
})
export class CheckboxesComponent implements OnInit {

  @Input() label: string;
  @Input() items: TextValuePair<any, any>[];

  @Output() onChangeEvent: EventEmitter<TextValuePair<any, any>[]> = new EventEmitter<TextValuePair<any, any>[]>();
  
  selectedValues:TextValuePair<any, any>[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  onChange(textValuePair: TextValuePair<any, any>){
    let index = this.selectedValues.indexOf(textValuePair);

    if(index > -1){
      this.selectedValues.splice(index, 1);
    }else{
      this.selectedValues.push(textValuePair);
    }

    this.onChangeEvent.emit(this.selectedValues);
  }
}
