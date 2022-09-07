import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalSearchForDxDataGridComponent } from './global-search-for-dx-data-grid.component';

describe('GlobalSearchForDxDataGridComponent', () => {
  let component: GlobalSearchForDxDataGridComponent;
  let fixture: ComponentFixture<GlobalSearchForDxDataGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlobalSearchForDxDataGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalSearchForDxDataGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
