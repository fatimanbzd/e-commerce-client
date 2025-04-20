import {Component, DestroyRef, OnInit} from '@angular/core';
import {CartService} from '../../../../shared/services/cart.service';
import {NavigationEnd, Router} from '@angular/router';
import {NgbPopover} from '@ng-bootstrap/ng-bootstrap';
import {debounceTime, filter} from 'rxjs';
import {AuthService} from '../../../../auth/services/auth.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {PricePipe} from '../../../../shared/pipes/price.pipe';

@Component({
  selector: 'app-order-checkout-sidebar',
  imports: [PricePipe, NgbPopover],
  templateUrl: './order-checkout-sidebar.component.html',
  styleUrl: './order-checkout-sidebar.component.scss',
})
export class OrderCheckoutSidebarComponent implements OnInit {
  totalPrice: number | null = null;
  currentUrl!: string;
  previousUrl!: string;
  orderButtonTitle = 'ادامه ثبت سفارش';

  constructor(
    private cartService: CartService,
    public router: Router,
    private authService: AuthService,
    private destroyRef: DestroyRef,
  ) {
    this.currentUrl = this.router.url;
    this.changeButtonName();

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
        this.changeButtonName();
      }
    });
  }

  ngOnInit() {
    this.updatedCart();
  }

  updatedCart() {
    this.totalPrice = null;
    this.cartService.updatedCartResult$
      .pipe(
        debounceTime(100),
        filter((cart): boolean => !!cart && !!cart.cartItems),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((cart) => {
        this.totalPrice =
          cart.cartItems.length > 0
            ? cart.cartItems.reduce(
                (totalPrice, b) => totalPrice + b.price * b.count,
                0,
              )
            : this.currentUrl == '/pages/checkout/cart'
              ? null
              : (cart.totalPrice ?? null);
      });
  }

  onProceedToNextStep(currentUrl: string) {
    switch (currentUrl) {
      case '/pages/checkout/cart':
        {
          if (
            this.authService.isLoggedIn() &&
            !this.authService.getUserAuthenticated()?.nationalNumber
          )
            this.router.navigate(['/pages/checkout/registration']);
          else this.router.navigate(['/pages/checkout/ship']);
        }
        break;
      case '/pages/checkout/registration':
        this.cartService.setRegistrationForm();
        break;
      case '/pages/checkout/ship':
        this.cartService.setFormData(true);
        break;
      case '/pages/checkout/pre-invoice':
        this.router.navigate(['/pages/checkout/wallet']);
        break;
      case '/pages/checkout/wallet':
        this.cartService.setWalletForm();
    }
  }

  changeButtonName() {
    const URL_TITLE_MAP: { [key: string]: string } = {
      '/pages/checkout/cart': 'ادامه ثبت سفارش',
      '/pages/checkout/registration': 'ثبت نام و ادامه',
      '/pages/checkout/ship': 'ثبت سفارش',
      '/pages/checkout/pre-invoice': 'انتخاب کیف پول',
      '/pages/checkout/wallet': 'پرداخت',
    };
    this.orderButtonTitle = URL_TITLE_MAP[this.currentUrl] || 'ادامه ثبت سفارش';
  }
}
