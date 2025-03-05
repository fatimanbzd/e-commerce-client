import { Component } from '@angular/core';
import { OrderRegistrationComponent } from '../../../../features/order/components/order-registration/order-registration.component';

@Component({
    selector: 'app-order-registration-page',
    imports: [OrderRegistrationComponent],
    templateUrl: './order-registration-page.component.html',
    styleUrl: './order-registration-page.component.scss'
})
export class OrderRegistrationPageComponent {}
