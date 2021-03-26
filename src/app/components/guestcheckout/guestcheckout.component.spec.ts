import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestcheckoutComponent } from './guestcheckout.component';

describe('GuestcheckoutComponent', () => {
  let component: GuestcheckoutComponent;
  let fixture: ComponentFixture<GuestcheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuestcheckoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestcheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
