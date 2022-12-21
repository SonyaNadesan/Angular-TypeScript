import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandCollapsePanelComponent } from './expand-collapse-panel.component';

describe('ExpandCollapsePanelComponent', () => {
  let component: ExpandCollapsePanelComponent;
  let fixture: ComponentFixture<ExpandCollapsePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpandCollapsePanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpandCollapsePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
