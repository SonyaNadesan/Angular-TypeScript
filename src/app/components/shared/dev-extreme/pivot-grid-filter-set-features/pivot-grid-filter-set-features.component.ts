import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateUserDefinedView } from 'src/app/models/CreateUserDefinedView';
import { UserDefinedView } from 'src/app/models/UserDefinedView';
import { FiltersInUseStatus } from 'src/app/models/FiltersInUseStatus';
import { KeyValuePair } from 'src/app/models/KeyValuePair';
import { ServiceResponse } from 'src/app/models/ServiceResponse';
import { PivotGridComponent } from '../pivot-grid/pivot-grid.component';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'PivotGridFilterSetFeatures',
  templateUrl: './pivot-grid-filter-set-features.component.html',
  styleUrls: ['./pivot-grid-filter-set-features.component.css']
})
export class PivotGridFilterSetFeaturesComponent implements OnInit {

  @Input() labelMode: string = "static";
  label = "Filter Set";

  @Input() pivotGrid: PivotGridComponent;
  @Input() queryString: string;
  @Input() filtersInUseStatus: FiltersInUseStatus = FiltersInUseStatus.NONE;
  filtersInUseStatus_saved: FiltersInUseStatus = FiltersInUseStatus.SAVED;
  filtersInUseStatus_unsaved: FiltersInUseStatus = FiltersInUseStatus.UNSAVED;

  filterSetDropDownOptions: KeyValuePair<number, string>[] = [];
  selectedFilterSet: UserDefinedView;

  saveAsNewFilterSetModalVisibility: boolean = false;
  deleteFilterSetConfirmModalVisbility: boolean = false;
  copyLinkTooltipVisibility: boolean = false;
  copyLinkButtonId: string;

  @Input() populateFilterSetList: () => Observable<ServiceResponse<UserDefinedView[]>>;
  @Input() saveAsNewFilterSet: (filterSetName: string, queryString: string) => Observable<ServiceResponse<boolean>>;
  @Input() deleteFilterSet: (filterSetId: number) => Observable<ServiceResponse<boolean>>;
  @Input() getFilterSetById: (filterSetId: number) => Observable<ServiceResponse<UserDefinedView>>;
  @Input() queryStringToObject: <T>(queryString: string) => T;

  @Input() positionOfIcons: string = "right";

  @Output() queryObjectEvent: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router) { }

  ngOnInit() {
    let queryObject = this.getQueryString();

    if (queryObject) {
      this.selectedFilterSet = null;
      this.filtersInUseStatus = FiltersInUseStatus.UNSAVED;
      this.queryObjectEvent.emit(queryObject);
    }

    this.populateFilterSetList().subscribe(x => {
      this.filterSetDropDownOptions = x.result.map(x => new KeyValuePair<number, string>(x.id, x.viewName));
    });

    this.copyLinkButtonId = this.pivotGrid.pivotGridId + '_filterSet_btnCopy';
  }

  onLoadFilterSet(event: KeyValuePair<number, string>) {
    this.getFilterSetById(event.key).subscribe(x => {
      if (x.isValid) {
        if (x.result) {
          this.queryString = x.result.queryParameter;
          let obj = this.queryStringToObject(this.queryString);
          this.selectedFilterSet = x.result;
          this.queryObjectEvent.emit(obj);
          this.filtersInUseStatus = FiltersInUseStatus.SAVED;
        }
      }
    });
  }

  onSaveAsNewFilterSet(filterSetName: string) {
    let filterSetNameLower = filterSetName.toLowerCase();
    let alreadyExists = this.filterSetDropDownOptions.findIndex(x => x.value.toLowerCase() == filterSetNameLower) > -1;

    if (alreadyExists) {
      alert("There is already a grid state called " + filterSetName + ". Please provide a different name.");
    } else {
      let newFilterSet = new CreateUserDefinedView();
      newFilterSet.gridState = "";
      newFilterSet.viewName = filterSetName;
      newFilterSet.queryParameters = this.queryString;

      this.saveAsNewFilterSet(filterSetName, this.queryString).subscribe(x => {
        if (x.result) {
          this.populateFilterSetList().subscribe(x => {
            this.filterSetDropDownOptions = x.result.map(x => new KeyValuePair<number, string>(x.id, x.viewName));
            this.selectedFilterSet = x.result.find(x => x.includesFilterSet && x.viewName == filterSetName);
          });

          this.saveAsNewFilterSetModalVisibility = false;
        }else{
          alert("Sorry, something went wrong.z\n" + x.errorMessage);
        }
      });
    }
  }

  onDeleteFilterSet(filterSetId: number) {
    let selection = this.filterSetDropDownOptions.find(x => x.key == filterSetId);

    if (!selection) {
      alert("Cannot delete system default grid state!");
    } else {
      this.deleteFilterSet(filterSetId).subscribe(x => {
        if (x.isValid) {
          this.filterSetDropDownOptions = this.filterSetDropDownOptions.filter(x => x.key != filterSetId);
          this.selectedFilterSet = null;
          this.filtersInUseStatus = FiltersInUseStatus.NONE;
          this.deleteFilterSetConfirmModalVisbility = false;
        } else {
          alert("Sorry, something went wrong.z\n" + x.errorMessage);
        }
      });
    }
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

    let textToCopy = `${url}${this.router.url};${this.queryString}`;
    navigator.clipboard.writeText(textToCopy);
    this.copyLinkTooltipVisibility = true;
  }

  toggleSaveNewFilterSetModalVisibility() {
    this.saveAsNewFilterSetModalVisibility = !this.saveAsNewFilterSetModalVisibility;
  }

  toggleDeleteFilterSetConfirmModalVisbility() {
    this.deleteFilterSetConfirmModalVisbility = !this.deleteFilterSetConfirmModalVisbility;
  }

  private getQueryString() {
    let indexOf = this.router.url.indexOf(";");

    if (indexOf > -1) {
      indexOf = indexOf + 1;
      let queryString = this.router.url.substring(indexOf);

      if (queryString) {
        let queryObject = this.queryStringToObject(queryString);
        return queryObject;
      }

      return null;
    }

    return null;
  }
}