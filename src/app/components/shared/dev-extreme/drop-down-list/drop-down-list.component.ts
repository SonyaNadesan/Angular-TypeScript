import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { KeyValuePair } from 'src/app/models/KeyValuePair';

@Component({
  selector: 'DropDownList',
  templateUrl: './drop-down-list.component.html',
  styleUrls: ['./drop-down-list.component.css']
})
export class DropDownListComponent implements OnInit {

  @Input() items: KeyValuePair<any, any>[] = [];

  @Input() label: string = "Please Select";

  @Input() isDisabled: boolean = false;

  @Output() onChangeEvent: EventEmitter<KeyValuePair<any, any>> = new EventEmitter<KeyValuePair<any, any>>();

  @Input() selectedValue: string = "";

  @Input() labelMode: string = "static";

  searchModeOption: string = "contains";
  searchExprOption: any = "key";
  searchTimeoutOption: number = 200;
  minSearchLengthOption: number = 0;
  showDataBeforeSearchOption: boolean = false;

  constructor() { }

  ngOnInit() {
    if (this.items && this.items.length > 0) {
      this.selectedValue == this.items[0].value;
    }
  }

  onChange(event: any) {
    let selected = this.items.find(x => x.value == event.value);
    this.selectedValue = selected ? selected.value : "";

    if (selected) {
      this.onChangeEvent.emit(selected);
    }
  }
}