import { Component } from '@angular/core';
import { OrderWalletComponent } from '../../../../features/order/components/order-wallet/order-wallet.component';

@Component({
    selector: 'app-order-wallet-page',
    imports: [OrderWalletComponent],
    templateUrl: './order-wallet-page.component.html',
    styleUrl: './order-wallet-page.component.scss'
})
export class OrderWalletPageComponent {}
