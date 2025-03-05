import { Component } from '@angular/core';
import { OrderProductsComponent } from '../../../../features/order/components/order-products/order-products.component';

@Component({
    selector: 'app-order-product-page',
    imports: [OrderProductsComponent],
    templateUrl: './order-product-page.component.html',
    styleUrl: './order-product-page.component.scss'
})
export class OrderProductPageComponent {}
