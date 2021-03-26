import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnConditionsComponent } from './return-conditions.component';

describe('ReturnConditionsComponent', () => {
  let component: ReturnConditionsComponent;
  let fixture: ComponentFixture<ReturnConditionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReturnConditionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
