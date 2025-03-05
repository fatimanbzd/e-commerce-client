import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPaymentConfirmationDialogComponent } from './order-payment-confirmation-dialog.component';

describe('OrderPaymentConfirmationDialogComponent', () => {
  let component: OrderPaymentConfirmationDialogComponent;
  let fixture: ComponentFixture<OrderPaymentConfirmationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderPaymentConfirmationDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderPaymentConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
