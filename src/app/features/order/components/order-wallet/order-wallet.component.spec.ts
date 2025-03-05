import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderWalletComponent } from './order-wallet.component';

describe('OrderWalletComponent', () => {
  let component: OrderWalletComponent;
  let fixture: ComponentFixture<OrderWalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderWalletComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
