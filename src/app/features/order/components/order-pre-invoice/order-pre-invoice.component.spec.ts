import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPreInvoiceComponent } from './order-pre-invoice.component';

describe('OrderPreInvoiceComponent', () => {
  let component: OrderPreInvoiceComponent;
  let fixture: ComponentFixture<OrderPreInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderPreInvoiceComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderPreInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
