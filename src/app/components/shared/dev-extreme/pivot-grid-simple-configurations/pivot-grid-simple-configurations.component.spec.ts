import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PivotGridSimpleConfigurationsComponent } from './pivot-grid-simple-configurations.component';

describe('PivotGridSimpleConfigurationsComponent', () => {
  let component: PivotGridSimpleConfigurationsComponent;
  let fixture: ComponentFixture<PivotGridSimpleConfigurationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PivotGridSimpleConfigurationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PivotGridSimpleConfigurationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
