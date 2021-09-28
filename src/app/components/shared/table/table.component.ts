import { Component, OnInit, Input } from '@angular/core';
import { KeyValuePair } from '../../KeyValuePair';

@Component({
  selector: 'Table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input() public columns: KeyValuePair<string, string>[];
  @Input() public items: any[] = [];

  rows: any[] = [];

  constructor() { }

  ngOnInit(): void {
    if(this.items == undefined || this.items == null){
      for (const [key, value] of Object.entries(this.items[0])) {
        let column = new KeyValuePair<string, string>(key, key);
        this.columns.push(column);
      }
    }

    this.rows = this.items.map(x => this.columns.map(c => x[c.key]));
  }
}