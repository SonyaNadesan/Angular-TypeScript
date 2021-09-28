import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { PaginationPage } from '../PaginationPage';

@Component({
  selector: 'Pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  @Input() public startPage: number;
  @Input() public lastPage: number;
  @Input() public currentPage: number;

  @Output() public pageClickEvent = new EventEmitter<number>();

  public pages: PaginationPage[] = new Array<PaginationPage>();

  constructor() { 
  }

  ngOnInit(): void {
    for(let i = this.startPage; i <= this.lastPage; i++){
      let page = new PaginationPage(i, i == this.currentPage);
      this.pages.push(page);
    }
  }

  onPageClick(page: number){
    this.pageClickEvent.emit(page);
  }
}