import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceGridExpandedComponent } from './device-grid-expanded.component';

describe('DeviceGridExpandedComponent', () => {
  let component: DeviceGridExpandedComponent;
  let fixture: ComponentFixture<DeviceGridExpandedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeviceGridExpandedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeviceGridExpandedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
