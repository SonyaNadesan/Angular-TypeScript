import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'Pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})

export class PaginationComponent implements OnInit {

  @Input() public numberOfPages: number;
  @Input() public startPage: number;
  @Input() public lastPage: number;
  @Input() public currentPage: number;
  @Input() public maxNumberOfPagesToShowOnEachRequest: number;
  
  //@Input("hiddenFields") private _hiddenFields: any[] = new Array();

  @Output() pageClickEvent = new EventEmitter<number>();

  public hiddenFields = new Array();

  constructor() { 
    
  }

  ngOnInit(): void {
  }

  onPageClick(page: number){
    this.pageClickEvent.emit(page);
  }

}