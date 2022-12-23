import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridGridStateFeaturesComponent } from './grid-grid-state-features.component';

describe('GridGridStateFeaturesComponent', () => {
  let component: GridGridStateFeaturesComponent;
  let fixture: ComponentFixture<GridGridStateFeaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridGridStateFeaturesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridGridStateFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
