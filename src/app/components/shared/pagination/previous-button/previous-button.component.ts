import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'PreviousButton',
  templateUrl: './previous-button.component.html',
  styleUrls: ['./previous-button.component.css']
})

export class PreviousButtonComponent implements OnInit {

  @Input() public startPage: number;
  @Input() public numberOfPages: number; 
  @Input() public maxNumberOfPagesToShowOnEachRequest: number;

  @Output() pageClickEvent =new EventEmitter<number>();

  public previousPage: number = 0;

  public showPreviousButton: boolean = false;

  constructor() { 
    
  }

  ngOnInit(): void {
    if(this.startPage > this.maxNumberOfPagesToShowOnEachRequest && this.numberOfPages > this.maxNumberOfPagesToShowOnEachRequest){
      this.showPreviousButton = true;
      this.previousPage = this.startPage - 1;
    }
  }

  onPageClick(page: number){
    this.pageClickEvent.emit(page);
  }
}
