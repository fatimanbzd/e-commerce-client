import { Component } from '@angular/core';
import { OrderPreInvoiceComponent } from '../../../../features/order/components/order-pre-invoice/order-pre-invoice.component';

@Component({
    selector: 'app-order-pre-invoice-page',
    imports: [OrderPreInvoiceComponent],
    templateUrl: './order-pre-invoice-page.component.html',
    styleUrl: './order-pre-invoice-page.component.scss'
})
export class OrderPreInvoicePageComponent {}
