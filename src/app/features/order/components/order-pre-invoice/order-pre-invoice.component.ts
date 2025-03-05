import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { OrderInvoiceService } from '../../services/order-invoice.service';
import { fromEvent, Subject, takeUntil } from 'rxjs';
import { IPreInvoiceModel } from '../../interfaces/pre-invoice.model';
import { PricePipe } from '@core/pipes/price.pipe';
import { PersianDatePipe } from '@core/pipes/persian-date.pipe';
import { CartService } from '../../../../shared/services/cart.service';
import { ICartResponseModel } from '../../../../shared/interfaces/cart-response.model';
import { OrderNavigationService } from '../../../../shared/services/order-navigation.service';

@Component({
    selector: 'app-order-pre-invoice',
    imports: [RouterLink, PricePipe, PersianDatePipe],
    templateUrl: './order-pre-invoice.component.html',
    styleUrl: './order-pre-invoice.component.scss'
})
export class OrderPreInvoiceComponent implements OnInit, OnDestroy {
  invoice!: IPreInvoiceModel;
  private readonly _destroy = new Subject<void>();

  constructor(
    private invoiceService: OrderInvoiceService,
    private cartService: CartService,
    private router: Router,
    private orderNavigation: OrderNavigationService,
  ) {
    fromEvent(window, 'popstate')
      .pipe(takeUntil(this._destroy))
      .subscribe(() => {
        this.router.navigateByUrl('/pages/content/order/cart');
      });
  }

  ngOnInit() {
    this.getInvoice();
    this.orderNavigation.completeStep('pre-invoice');
  }

  getInvoice() {
    this.invoiceService
      .preInvoice()
      .pipe(takeUntil(this._destroy))
      .subscribe((invoice) => {
        this.invoice = invoice;

        this.cartService.setUpdateCartResult({
          hasData: false,
          cartNumber: '',
          cartItems: [],
          totalPrice: invoice.invoiceTotalAmount,
        } as ICartResponseModel);
      });
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }
}
