import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'NextButton',
  templateUrl: './next-button.component.html',
  styleUrls: ['./next-button.component.css']
})
export class NextButtonComponent implements OnInit {

  @Input() public lastPage: number;
  @Input() public numberOfPages: number;
  @Input() public maxNumberOfPagesToShowOnEachRequest: number;

  @Output() pageClickEvent =new EventEmitter<number>();

  public nextPage:number = 0;

  public showNextButton:boolean = false;

  constructor() { 
  }

  ngOnInit(): void {
    if (this.lastPage < this.numberOfPages && this.numberOfPages > this.maxNumberOfPagesToShowOnEachRequest) {
      this.showNextButton = true;
      this.nextPage = this.lastPage + 1;
    }
  }

  onPageClick(page: number){
    this.pageClickEvent.emit(page);
  }
}
