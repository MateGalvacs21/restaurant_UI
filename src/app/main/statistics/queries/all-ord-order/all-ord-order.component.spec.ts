import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllOrdOrderComponent } from './all-ord-order.component';

describe('AllOrdOrderComponent', () => {
  let component: AllOrdOrderComponent;
  let fixture: ComponentFixture<AllOrdOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllOrdOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllOrdOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
