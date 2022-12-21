import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PivotGridGridStateFeaturesComponent } from './pivot-grid-grid-state-features.component';

describe('PivotGridGridStateFeaturesComponent', () => {
  let component: PivotGridGridStateFeaturesComponent;
  let fixture: ComponentFixture<PivotGridGridStateFeaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PivotGridGridStateFeaturesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PivotGridGridStateFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
