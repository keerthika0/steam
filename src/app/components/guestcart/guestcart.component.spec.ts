import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestcartComponent } from './guestcart.component';

describe('GuestcartComponent', () => {
  let component: GuestcartComponent;
  let fixture: ComponentFixture<GuestcartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuestcartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestcartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
