import {Component, OnDestroy, OnInit} from '@angular/core';
import {ICartItemResponseModel, ICartResponseModel,} from '../../../../shared/interfaces/cart-response.model';
import {catchError, forkJoin, Subject, takeUntil} from 'rxjs';
import {CartService} from '../../../../shared/services/cart.service';
import {ProductGuarantyLabel} from '../../../../shared/enums/product-guaranty.enum';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ICartModel} from '../../../../shared/interfaces/cart.model';
import {RouterLink} from '@angular/router';
import {EnumLabelPipe} from '../../../../shared/pipes/enum-label.pipe';
import {PricePipe} from '../../../../shared/pipes/price.pipe';
import {FullSrcPipe} from '../../../../shared/pipes/full-src.pipe';
import {
  ConfirmationDialogComponent
} from '../../../../shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-order-products',
  imports: [PricePipe, EnumLabelPipe, FullSrcPipe, RouterLink],
  templateUrl: './order-products.component.html',
  styleUrl: './order-products.component.scss',
})
export class OrderProductsComponent implements OnInit, OnDestroy {
  cart!: ICartResponseModel;
  protected readonly ProductGuarantyLabel = ProductGuarantyLabel;
  private readonly _destroy = new Subject<void>();

  constructor(
    private cartService: CartService,
    private modalService: NgbModal,
  ) {}

  ngOnInit() {
    this.cartService.updatedCartResult$
      .pipe(takeUntil(this._destroy))
      .subscribe((cart) => {
        if (cart) this.cart = cart;
      });
  }

  getCarts() {
    this.cartService
      .carts()
      .pipe(takeUntil(this._destroy))
      .subscribe((cart) => (this.cart = cart));
  }

  delete(cart: ICartItemResponseModel, count: number) {
    if (count === cart.lowestNumberOfOrders)
      this.cartService
        .delete(cart.productPriceId)
        .pipe(takeUntil(this._destroy))
        .subscribe(() => {
          const cartItem = this.cart.cartItems
            .map((x) => x.productPriceId)
            .indexOf(cart.productPriceId);
          if (cartItem > -1) this.cart.cartItems.splice(cartItem, 1);

          if (this.cart.cartItems.length === 0) this.cart.totalPrice = 0;

          this.cartService.setUpdateCartModalResult(this.cart);
          this.cartService.setUpdateCartResult(this.cart);
        });
    else this.changeTheProductCount(false, cart);
  }

  changeTheProductCount(type: boolean, cart: ICartItemResponseModel) {
    this.addProductCount({
      productPriceId: cart.productPriceId,
      count: type
        ? cart.count + cart.lowestNumberOfOrders
        : cart.count - cart.lowestNumberOfOrders,
    } as ICartModel);
  }

  addProductCount(cart: ICartModel) {
    this.cartService
      .addCart(cart)
      .pipe(takeUntil(this._destroy))
      .subscribe({
        next: () => {
          let cartItem = this.cart.cartItems.find(
            (x) => x.productPriceId === cart.productPriceId,
          );
          if (cartItem) cartItem.count = cart.count;
          this.cartService.setUpdateCartResult(this.cart);
          this.cartService.setUpdateCartModalResult(this.cart);
        },
        error: () => {},
      });
  }

  openRemoveProductModel(cart: ICartItemResponseModel, count: number) {
    if (count == cart.lowestNumberOfOrders) {
      const modalRef = this.modalService.open(ConfirmationDialogComponent);
      modalRef.componentInstance.title = 'حذف محصول';
      modalRef.componentInstance.body =
        'آیا از حذف این محصول از سبد خرید مطمئن هستید؟';
      modalRef.componentInstance.btnValue = 'بله حذف شود';
      modalRef.result.then((result: boolean) => {
        if (result) {
          this.delete(cart, count);
        }
      });
    } else this.changeTheProductCount(false, cart);
  }

  emptyCart() {
    const modalRef = this.modalService.open(ConfirmationDialogComponent);
    modalRef.componentInstance.title = 'حذف سبد';
    modalRef.componentInstance.body = 'آیا از حذف سبد مطمئن هستید؟';
    modalRef.componentInstance.btnValue = 'بله حذف شود';
    modalRef.result.then((result: boolean) => {
      if (result) {
        const deleteObservables = this.cart.cartItems.map((cartItem) =>
          this.cartService.delete(cartItem.productPriceId),
        );
        deleteObservables;
        forkJoin(deleteObservables)
          .pipe(
            catchError(() => {
              return [];
            }),
          )
          .subscribe(() => {
            this.cartService.setUpdateCartResult({
              hasData: false,
              cartNumber: '',
              cartItems: [],
              totalPrice: 0,
            } as ICartResponseModel);
          });
      }
    });
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }
}
