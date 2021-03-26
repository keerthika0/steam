import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaypaysuccessComponent } from './paypaysuccess.component';

describe('PaypaysuccessComponent', () => {
  let component: PaypaysuccessComponent;
  let fixture: ComponentFixture<PaypaysuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaypaysuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaypaysuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
