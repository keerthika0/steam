import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryChargesComponent } from './delivery-charges.component';

describe('DeliveryChargesComponent', () => {
  let component: DeliveryChargesComponent;
  let fixture: ComponentFixture<DeliveryChargesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryChargesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryChargesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
