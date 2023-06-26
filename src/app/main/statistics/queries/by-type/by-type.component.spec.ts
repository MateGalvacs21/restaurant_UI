import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ByTypeComponent } from './by-type.component';

describe('ByTypeComponent', () => {
  let component: ByTypeComponent;
  let fixture: ComponentFixture<ByTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ByTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ByTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
