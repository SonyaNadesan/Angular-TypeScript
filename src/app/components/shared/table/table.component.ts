import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TextValuePair } from '../../TextValuePair';

@Component({
  selector: 'Table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input() public columns: TextValuePair<string, string>[];
  @Input() public items: any[] = [];

  @Output() onRowClickEvent: EventEmitter<any> = new EventEmitter<any>();

  rows: any[] = [];

  constructor() { }

  ngOnInit(): void {
    if(this.items == undefined || this.items == null){
      for (const [propertyName, propertyValue] of Object.entries(this.items[0])) {
        let column = new TextValuePair<string, string>(propertyName, propertyName);
        this.columns.push(column);
      }
    }

    this.rows = this.items.map(x => this.columns.map(c => x[c.value]));
  }

  onRowClick(selectedRow: any){
    let index = this.rows.indexOf(selectedRow);
    let item = this.items[index];
    this.onRowClickEvent.emit(item);
  }
}