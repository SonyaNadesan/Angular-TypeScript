import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { PaginationPage } from '../PaginationPage';

@Component({
  selector: 'Page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})

export class PageComponent implements OnInit {

  @Input() public pageNumber: number;
  @Input() public isCurrentPage: boolean;
  
  @Output() pageClickEvent =new EventEmitter<number>();

  public page: PaginationPage;

  constructor() { }

  ngOnInit(): void {
    this.page = new PaginationPage(this.pageNumber, this.isCurrentPage);
  }

  onPageClick(page: number){
    this.pageClickEvent.emit(page);
  }
}