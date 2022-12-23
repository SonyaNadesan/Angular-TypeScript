import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridConfigurationsPanelComponent } from './grid-configurations-panel.component';

describe('PivotGridConfigurationsPanelComponent', () => {
  let component: GridConfigurationsPanelComponent;
  let fixture: ComponentFixture<GridConfigurationsPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridConfigurationsPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridConfigurationsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
