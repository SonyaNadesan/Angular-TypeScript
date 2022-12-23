import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridFilterSetFeaturesComponent } from './grid-filter-set-features.component';

describe('GridFilterSetFeaturesComponent', () => {
  let component: GridFilterSetFeaturesComponent;
  let fixture: ComponentFixture<GridFilterSetFeaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridFilterSetFeaturesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridFilterSetFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
