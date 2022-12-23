import { Component, Input, OnInit } from '@angular/core';
import { IGrid } from 'src/app/models/IGrid';
import { PivotGridComponent } from '../pivot-grid/pivot-grid.component';

@Component({
  selector: 'GridConfigurationPanel',
  templateUrl: './grid-configurations-panel.component.html',
  styleUrls: ['./grid-configurations-panel.component.css']
})
export class GridConfigurationsPanelComponent implements OnInit {

  @Input() grid: IGrid;
  @Input() id: string;

  constructor() { }

  ngOnInit() {
    
  }
}