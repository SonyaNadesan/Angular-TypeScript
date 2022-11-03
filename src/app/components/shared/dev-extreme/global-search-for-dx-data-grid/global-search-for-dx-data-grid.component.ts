import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReflectionService } from 'src/app/services/reflection.service';

@Component({
  selector: 'GlobalSearchForDxDataGridComponent',
  templateUrl: './global-search-for-dx-data-grid.component.html',
  styleUrls: ['./global-search-for-dx-data-grid.component.css']
})
export class GlobalSearchForDxDataGridComponent implements OnInit {

  @Input() data: any[] = [];
  
  filterValue: string = '';

  @Output() filterConditionChange: EventEmitter<any[]> = new EventEmitter<any[]>();
  @Output() clearFilterEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private reflectionServiceService: ReflectionService) { }

  ngOnInit() {
  }

  onFilter(event: any) {
    this.filter(event.target.value);
  }

  clearFilter(event: any) {
    this.filterValue = '';
    this.clearFilterEvent.emit(true);
  }

  private filter(filter: string) {
    if (this.data.length > 0) {
      this.filterValue = filter;

      let properties = this.reflectionServiceService.getProperties(this.data);

      let conditions: any[] = [];

      properties.forEach((property: string, index: number) => {
        if(index > 0){
          conditions.push('or');
        }

        conditions.push([property, 'contains', this.filterValue]);
      })

      this.filterConditionChange.emit(conditions);
    }
  }
}