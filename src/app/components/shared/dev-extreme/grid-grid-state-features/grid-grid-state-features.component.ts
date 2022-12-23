import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateUserDefinedView } from 'src/app/models/CreateUserDefinedView';
import { UserDefinedView } from 'src/app/models/UserDefinedView';
import { KeyValuePair } from 'src/app/models/KeyValuePair';
import { ServiceResponse } from 'src/app/models/ServiceResponse';
import { IGrid } from 'src/app/models/IGrid';

@Component({
  selector: 'GridGridStateFeatures',
  templateUrl: './grid-grid-state-features.component.html',
  styleUrls: ['./grid-grid-state-features.component.css']
})
export class GridGridStateFeaturesComponent implements OnInit {

  @Input() labelMode: string = "static";
  label = "Grid State";

  gridStateDropDownOptions: KeyValuePair<number, string>[] = [];
  selectedGridState: UserDefinedView;

  saveAsNewGridStateModalVisibility:boolean = false;
  deleteGridStateConfirmModalVisbility: boolean = false;
  copyLinkTooltipVisibility: boolean = false;

  copyLinkButtonId: string;

  @Input() grid: IGrid;
  @Input() populateGridStateList: () => Observable<ServiceResponse<UserDefinedView[]>>;
  @Input() saveAsNewGridState: (gridStateName: string, gridState: any) => Observable<ServiceResponse<boolean>>;
  @Input() deleteGridState: (gridStateId: number) => Observable<ServiceResponse<boolean>>;
  @Input() setGridStateAsDefault: (gridStateId: number) => Observable<ServiceResponse<boolean>>;
  @Input() getGridStateById: (gridStateId: number) => Observable<ServiceResponse<UserDefinedView>>;
  @Input() getDefaultGridStateBasedOnUser: () => Observable<ServiceResponse<UserDefinedView>>;

  @Input() positionOfIcons: string = "right";

  systemDefaultGridStateName: string = "Default";

  constructor(private router: Router) { }

  ngOnInit() {
    this.populateGridStateList().subscribe(x => {
      this.gridStateDropDownOptions = x.result.map(x => new KeyValuePair<number, string>(x.id, x.viewName));
      this.getDefaultGridStateBasedOnUser().subscribe(x => {
        if(x.isValid){
          this.loadGridState(x.result.id);
        }
      });
    });

    this.copyLinkButtonId = this.grid.gridId + '_gridState_btnCopy';
  }

  onLoadGridState(event: KeyValuePair<number, string>){
    this.loadGridState(event.key);
  }

  onSaveAsNewGridState(gridStateName: string) {
    let grdStateNameLower = gridStateName.toLowerCase();
    let alreadyExists = this.gridStateDropDownOptions.findIndex(x => x.value.toLowerCase() == grdStateNameLower) > -1;

    if (alreadyExists) {
      alert("There is already a grid state called " + gridStateName + ". Please provide a different name.");
    } else {
      let newGridState = new CreateUserDefinedView();
      newGridState.gridState = this.grid.gridState;
      newGridState.viewName = gridStateName;
      newGridState.queryParameters = "";

      this.saveAsNewGridState(gridStateName, this.grid.gridState).subscribe(x => {
        if (x.result) {
          this.populateGridStateList().subscribe(x =>{
            this.gridStateDropDownOptions = x.result.map(x => new KeyValuePair<number, string>(x.id, x.viewName));
            this.selectedGridState = x.result.find(x => x.includesGridState && x.viewName == gridStateName);
          });

          this.saveAsNewGridStateModalVisibility = false;
        }
      });
    }
  }

  onDeleteGridState(gridStateId: number) {
    let selection = this.gridStateDropDownOptions.find(x => x.key == gridStateId);

    if (selection.value == this.systemDefaultGridStateName) {
      alert("Cannot delete system default grid state!");
    } else {
      this.deleteGridState(gridStateId).subscribe(x => {
        if (x.isValid) {
          this.gridStateDropDownOptions = this.gridStateDropDownOptions.filter(x => x.key != gridStateId);
          this.getDefaultGridStateBasedOnUser().subscribe(x => {
            if(x.isValid){
              if(x.result){
                this.grid.setState(x.result.gridState);
                this.selectedGridState = x.result;
              }
            }

            this.deleteGridStateConfirmModalVisbility = false;
          });
        }
      });
    }
  }

  onSetGridStateAsDefault(gridStateId: number){
    this.setGridStateAsDefault(gridStateId).subscribe(x => {
      if(x.result){
        this.getGridStateById(gridStateId).subscribe(x => {
          if(x.isValid){
            this.selectedGridState = x.result;
          }
        })  
      }else{
        alert(x.errorMessage);
      }
    });
  }

  copyLink(){
    let url = environment.link;
    let indexOfQueryString = url.indexOf(";");

    if(indexOfQueryString > -1){
      url = url.substring(0, indexOfQueryString)
    }else{
      let lastIndex = url.length - 1;
      if(url.charAt(lastIndex) == "/"){
        url = url.substring(0, lastIndex);
      }
    }

    let textToCopy = `${url}${this.router.url};viewId=${this.selectedGridState.id}`;
    navigator.clipboard.writeText(textToCopy);
    this.copyLinkTooltipVisibility = true;
  }

  toggleSaveNewGridStateModalVisibility(){
    this.saveAsNewGridStateModalVisibility = !this.saveAsNewGridStateModalVisibility;
  }

  toggleDeleteGridStateConfirmModalVisbility(){
    this.deleteGridStateConfirmModalVisbility = !this.deleteGridStateConfirmModalVisbility;
  }

  private loadGridState(gridState: number){
    this.getGridStateById(gridState).subscribe(x =>{
      if(x.isValid){
        if(x.result){
          this.grid.setState(x.result.gridState);
          this.selectedGridState = x.result;
        }
      }
    });
  }
}