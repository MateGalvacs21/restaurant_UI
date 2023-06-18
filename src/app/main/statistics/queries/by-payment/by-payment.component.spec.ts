import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ByPaymentComponent } from './by-payment.component';

describe('ByPaymentComponent', () => {
  let component: ByPaymentComponent;
  let fixture: ComponentFixture<ByPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ByPaymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ByPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
