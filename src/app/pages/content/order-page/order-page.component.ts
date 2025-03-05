import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PlatformLocation } from '@angular/common';
import { OrderCheckoutSidebarComponent } from '../../../features/order/components/order-checkout-sidebar/order-checkout-sidebar.component';

@Component({
    selector: 'app-order-page',
    imports: [RouterOutlet, OrderCheckoutSidebarComponent],
    templateUrl: './order-page.component.html',
    styleUrl: './order-page.component.scss'
})
export class OrderPageComponent implements OnInit {
  @ViewChild(OrderCheckoutSidebarComponent)
  orderCheckoutSidebar!: OrderCheckoutSidebarComponent;

  constructor(private location: PlatformLocation) {}

  ngOnInit(): void {
    this.location.onPopState(() => {
      this.handleBrowserBack();
    });
  }

  handleBrowserBack(): void {
    if (this.orderCheckoutSidebar) {
      this.orderCheckoutSidebar.changeButtonName();
      this.orderCheckoutSidebar.updatedCart();
    }
  }
}
