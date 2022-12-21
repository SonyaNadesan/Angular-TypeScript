import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ExpandCollapsePanel',
  templateUrl: './expand-collapse-panel.component.html',
  styleUrls: ['./expand-collapse-panel.component.css']
})
export class ExpandCollapsePanelComponent implements OnInit {

  controlPanelVisible: boolean = true;
  toggleControlPanelButtonStatus: string = "spinup";

  constructor() { }

  ngOnInit() {
  }

  toggleVisibilityOfControlPanelVisibility() {
    this.controlPanelVisible = !this.controlPanelVisible;

    if (this.controlPanelVisible) {
      this.toggleControlPanelButtonStatus = "spinup";
    } else {
      this.toggleControlPanelButtonStatus = "spindown";
    }
  }

}