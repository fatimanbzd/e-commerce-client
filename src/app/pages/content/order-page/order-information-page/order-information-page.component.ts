import { Component } from '@angular/core';
import { OrderInformationComponent } from '../../../../features/order/components/order-information/order-information.component';

@Component({
    selector: 'app-order-information-page',
    imports: [OrderInformationComponent],
    templateUrl: './order-information-page.component.html',
    styleUrl: './order-information-page.component.scss'
})
export class OrderInformationPageComponent {}
