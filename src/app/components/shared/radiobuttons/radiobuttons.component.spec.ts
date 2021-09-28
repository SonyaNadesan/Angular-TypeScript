import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadiobuttonsComponent } from './radiobuttons.component';

describe('RadiobuttonsComponent', () => {
  let component: RadiobuttonsComponent;
  let fixture: ComponentFixture<RadiobuttonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RadiobuttonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RadiobuttonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
