import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderRegistrationComponent } from './order-registration.component';

describe('OrderRegistrationComponent', () => {
  let component: OrderRegistrationComponent;
  let fixture: ComponentFixture<OrderRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderRegistrationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
