import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderWalletPageComponent } from './order-wallet-page.component';

describe('OrderWalletPageComponent', () => {
  let component: OrderWalletPageComponent;
  let fixture: ComponentFixture<OrderWalletPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderWalletPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderWalletPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
