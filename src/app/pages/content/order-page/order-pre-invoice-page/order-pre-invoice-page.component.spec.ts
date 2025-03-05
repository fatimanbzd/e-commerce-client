import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPreInvoicePageComponent } from './order-pre-invoice-page.component';

describe('OrderPreInvoicePageComponent', () => {
  let component: OrderPreInvoicePageComponent;
  let fixture: ComponentFixture<OrderPreInvoicePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderPreInvoicePageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderPreInvoicePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
