import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CartService } from '../../../../../shared/services/cart.service';
import {
  ICartItemResponseModel,
  ICartResponseModel,
} from '../../../../../shared/interfaces/cart-response.model';
import { FullSrcPipe } from '@core/pipes/full-src.pipe';
import { NgOptimizedImage } from '@angular/common';
import { PricePipe } from '@core/pipes/price.pipe';
import { RouterLink } from '@angular/router';
import { ICartModel } from '../../../../../shared/interfaces/cart.model';
import { AuthService } from '../../../../../auth/services/auth.service';

@Component({
    selector: 'app-header-product-basket',
    imports: [FullSrcPipe, NgOptimizedImage, PricePipe, RouterLink],
    templateUrl: './header-product-basket.component.html',
    styleUrl: './header-product-basket.component.scss'
})
export class HeaderProductBasketComponent implements OnDestroy {
  cart!: ICartResponseModel;
  nationalNumber: string | undefined;
  hasProfile = false;
  private readonly _destroy = new Subject<void>();
  @Output() changeCartItemCount = new EventEmitter<ICartResponseModel>();

  constructor(
    private cartService: CartService,
    private authService: AuthService,
  ) {
    const user = this.authService.getUserAuthenticated();
    this.hasProfile = this.authService.isLoggedIn() && !!user?.nationalNumber;
    this.cartService.updatedCartModalResult$
      .pipe(takeUntil(this._destroy))
      .subscribe((cart) => {
        this.cart = cart;
        this.getUpdateCart(cart);
      });
  }

  getUpdateCart(carts: ICartResponseModel) {
    let totalPrice = 0;
    if (carts && carts.cartItems && carts.cartItems.length > 0) {
      totalPrice =
        this.cart.cartItems?.reduce(
          (totalPrice, b) => totalPrice + b.price * b.count,
          0,
        ) ?? 0;
      this.cart.totalPrice = totalPrice;
    }
    this.changeCartItemCount.emit(this.cart);
  }

  changeTheProductCount(type: boolean, cart: ICartItemResponseModel) {
    this.addProductCount(type, {
      cart,
      count: type
        ? cart.count + cart.lowestNumberOfOrders
        : cart.count - cart.lowestNumberOfOrders,
    });
  }

  delete(productPriceId: number) {
    this.cartService
      .delete(productPriceId)
      .pipe(takeUntil(this._destroy))
      .subscribe(() => {
        const cartItem = this.cart.cartItems
          .map((x) => x.productPriceId)
          .indexOf(productPriceId);
        if (cartItem > -1) this.cart.cartItems.splice(cartItem, 1);
        this.getUpdateCart(this.cart);
        this.cartService.setUpdateCartResult(this.cart);
      });
  }

  addProductCount(
    addType: boolean,
    addModel: { cart: ICartItemResponseModel; count: number },
  ) {
    this.cartService
      .addCart({
        productPriceId: addModel.cart.productPriceId,
        count: addModel.count,
      } as ICartModel)
      .pipe(takeUntil(this._destroy))
      .subscribe({
        next: () => {
          let cartItem = this.cart.cartItems.find(
            (x) => x.productPriceId == addModel.cart.productPriceId,
          );
          if (cartItem) cartItem.count = addModel.count;
          this.getUpdateCart(this.cart);
          this.cartService.setUpdateCartResult(this.cart);
        },
      });
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }
}
