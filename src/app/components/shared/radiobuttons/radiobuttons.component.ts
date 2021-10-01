import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TextValuePair } from '../../TextValuePair';

@Component({
  selector: 'RadioButtons',
  templateUrl: './radiobuttons.component.html',
  styleUrls: ['./radiobuttons.component.css']
})
export class RadiobuttonsComponent implements OnInit {

  @Input() label:string;
  @Input() items: TextValuePair<any, any>[];
  @Input() selectedItem: TextValuePair<any, any>;
  @Input() radioButtonGroupName: string;

  @Output() onChangeEvent: EventEmitter<TextValuePair<any, any>> = new EventEmitter<TextValuePair<any, any>>();

  constructor() { }

  ngOnInit(): void {
  }

  onChange(item: TextValuePair<any, any>){
    this.selectedItem = item;

    this.onChangeEvent.emit(this.selectedItem);
  }
}