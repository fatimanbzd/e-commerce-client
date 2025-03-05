import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrderWalletService } from '../../services/order-wallet.service';
import { finalize, map, Subject, takeUntil } from 'rxjs';
import { PricePipe } from '@core/pipes/price.pipe';
import { EnumLabelPipe } from '@core/pipes/enum-label.pipe';
import { WalletTypeLabel } from '../../enums/wallet-type.enum';
import { FormsModule } from '@angular/forms';
import {
  IOrderPaymentModel,
  IOrderWalletResponseModel,
} from '../../interfaces/order-wallet.model';
import { CartService } from '../../../../shared/services/cart.service';
import { NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgClass } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrderPaymentConfirmationDialogComponent } from '../order-payment-confirmation-dialog/order-payment-confirmation-dialog.component';
import { OrderNavigationService } from '../../../../shared/services/order-navigation.service';

@Component({
    selector: 'app-order-wallet',
    imports: [PricePipe, EnumLabelPipe, FormsModule, NgClass],
    providers: [],
    templateUrl: './order-wallet.component.html',
    styleUrl: './order-wallet.component.scss'
})
export class OrderWalletComponent implements OnInit, OnDestroy {
  walletList!: IOrderWalletResponseModel[];
  loading = false;
  model = {
    wallets: [],
  };
  protected readonly WalletTypeLabel = WalletTypeLabel;
  protected readonly Number = Number;
  private readonly _destroy = new Subject<void>();

  constructor(
    private orderWalletService: OrderWalletService,
    private cartService: CartService,
    private router: Router,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private orderNavigation: OrderNavigationService,
  ) {
    this.submittedWallet();

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.modalService.dismissAll();
      }
    });
  }

  submittedWallet() {
    this.cartService.getWalletForm$
      .pipe(takeUntil(this._destroy))
      .subscribe(() => this.submit());
  }

  ngOnInit() {
    this.orderNavigation.completeStep('pre-invoice');
    this.getWallets();
  }

  getWallets() {
    this.loading = true;
    this.orderWalletService
      .Wallets()
      .pipe(
        map((m) => {
          return m.map((s) => ({ ...s, selected: false }));
        }),
        takeUntil(this._destroy),
        finalize(() => (this.loading = false)),
      )
      .subscribe((wallets) => {
        this.walletList = wallets;
      });
  }

  selectWallet(event: any, wallet: any) {
    wallet.selected = event;
  }

  submit() {
    const model: IOrderPaymentModel[] = this.walletList
      .filter((f) => f.selected == true)
      .map((m) => ({ walletAddress: m.address }) as IOrderPaymentModel);
    if (model.length == 0) {
      this.toastr.warning('انتخاب کیف پول الزامیست!');
      return;
    }

    this.cartService
      .payment(model)
      .pipe(takeUntil(this._destroy))
      .subscribe({
        next: () => {
          this.modalService.open(OrderPaymentConfirmationDialogComponent);
        },
      });
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }
}
