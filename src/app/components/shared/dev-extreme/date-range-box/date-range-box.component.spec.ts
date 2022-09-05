import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateRangeBoxComponent } from './date-range-box.component';

describe('DateRangeBoxComponent', () => {
  let component: DateRangeBoxComponent;
  let fixture: ComponentFixture<DateRangeBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DateRangeBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DateRangeBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
