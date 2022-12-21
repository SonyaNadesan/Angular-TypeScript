import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PivotGridFilterSetFeaturesComponent } from './pivot-grid-filter-set-features.component';

describe('PivotGridFilterSetFeaturesComponent', () => {
  let component: PivotGridFilterSetFeaturesComponent;
  let fixture: ComponentFixture<PivotGridFilterSetFeaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PivotGridFilterSetFeaturesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PivotGridFilterSetFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
