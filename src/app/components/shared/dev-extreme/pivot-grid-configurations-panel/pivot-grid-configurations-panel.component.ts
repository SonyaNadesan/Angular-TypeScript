import { Component, Input, OnInit } from '@angular/core';
import { PivotGridComponent } from '../pivot-grid/pivot-grid.component';

@Component({
  selector: 'PivotGridConfigurationPanel',
  templateUrl: './pivot-grid-configurations-panel.component.html',
  styleUrls: ['./pivot-grid-configurations-panel.component.css']
})
export class PivotGridConfigurationsPanelComponent implements OnInit {

  @Input() pivotGrid: PivotGridComponent;
  @Input() id: string;

  constructor() { }

  ngOnInit() {
    
  }
}