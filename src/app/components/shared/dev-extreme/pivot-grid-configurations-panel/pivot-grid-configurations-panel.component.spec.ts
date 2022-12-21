import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PivotGridConfigurationsPanelComponent } from './pivot-grid-configurations-panel.component';

describe('PivotGridConfigurationsPanelComponent', () => {
  let component: PivotGridConfigurationsPanelComponent;
  let fixture: ComponentFixture<PivotGridConfigurationsPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PivotGridConfigurationsPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PivotGridConfigurationsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
