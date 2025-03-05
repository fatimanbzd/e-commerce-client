import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { AuthService } from '../../../../auth/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { IUserModel } from '@core/interfaces/user.model';
import { Subject, takeUntil } from 'rxjs';
import { HeaderCategoryMenuComponent } from './header-category-menu/header-category-menu.component';
import { FormsModule } from '@angular/forms';
import { HeaderSearchBarComponent } from './header-search-bar/header-search-bar.component';
import { HeaderProductBasketComponent } from './header-product-basket/header-product-basket.component';
import { CartService } from '../../../../shared/services/cart.service';
import { ICartResponseModel } from '../../../../shared/interfaces/cart-response.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  encapsulation: ViewEncapsulation.None,
  imports: [
    RouterLink,
    HeaderCategoryMenuComponent,
    FormsModule,
    HeaderSearchBarComponent,
    HeaderProductBasketComponent,
  ],
})
export class HeaderComponent implements OnInit, OnDestroy {
  cartCount: number | null = null;
  userName!: string | undefined;
  hiddeservices = true;
  hidderightMenu = true;
  isAuthenticated = false;
  @Input() isCollapsed = false;
  @Output() trigger: EventEmitter<boolean> = new EventEmitter<boolean>();

  user!: IUserModel;
  private readonly _destroy = new Subject<void>();

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    public router: Router,
  ) {
    authService.authStatus$
      .pipe(takeUntil(this._destroy))
      .subscribe((login) => {
        this.isAuthenticated = login;
      });

    cartService.updatedCartResult$
      .pipe(takeUntil(this._destroy))
      .subscribe((cart) => {
        if (cart) this.calculateTotalCount(cart);
      });
  }

  ngOnInit(): void {
    if (this.isAuthenticated) {
      const userInfo = this.authService.getUserAuthenticated();
      if (userInfo) {
        this.isAuthenticated = true;
        this.userName = this.authService.getUserAuthenticated()?.mobileNumber;
      } else {
        this.authService
          .currentUser()
          .pipe(takeUntil(this._destroy))
          .subscribe((user) => (this.userName = user.mobileNumber));
      }
    }
    this.getCarts();
  }

  getCarts() {
    this.cartService
      .carts()
      .pipe(takeUntil(this._destroy))
      .subscribe((carts) => {
        if (carts && carts.cartItems && carts.cartItems.length > 0) {
          this.calculateTotalCount(carts);
          this.cartService.setUpdateCartModalResult(carts);
          this.cartService.setUpdateCartResult(carts);
        }
      });
  }

  logout() {
    this.authService.logout();
    this.authService.setAuth(false);
    this.router.navigate(['/pages/content']);
  }

  smallHeader() {
    this.hidderightMenu = !this.hidderightMenu;
  }

  services() {
    this.hiddeservices = !this.hiddeservices;
  }

  calculateTotalCount(cart: ICartResponseModel) {
    if (cart.cartItems && cart.cartItems.length > 0) {
      this.cartCount =
        cart.cartItems.reduce(
          (totalCount, cartPrice) => totalCount + cartPrice.count,
          0,
        ) ?? 0;
    } else this.cartCount = null;
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }
}
