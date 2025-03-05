import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCheckoutSidebarComponent } from './order-checkout-sidebar.component';

describe('OrderCheckoutSidebarComponent', () => {
  let component: OrderCheckoutSidebarComponent;
  let fixture: ComponentFixture<OrderCheckoutSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderCheckoutSidebarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderCheckoutSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
