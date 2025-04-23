import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  IPriceViewModel,
  IProductSpecificationsModel,
} from '../../../interfaces/productSpecifications.model';
import { NgClass } from '@angular/common';
import { finalize, Subject, takeUntil } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { CartService } from '../../../../../shared/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { ICartItemResponseModel } from '../../../../../shared/interfaces/cart-response.model';
import { ICartModel } from '../../../../../shared/interfaces/cart.model';
import { ConfirmAddToCartDialogComponent } from '../confirm-add-to-cart-dialog/confirm-add-to-cart-dialog.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductGuarantyLabel } from '../../../../../shared/enums/product-guaranty.enum';
import {PricePipe} from '../../../../../shared/pipes/price.pipe';
import {EnumLabelPipe} from '../../../../../shared/pipes/enum-label.pipe';

@Component({
  selector: 'app-product-price',
  imports: [NgClass, ReactiveFormsModule, EnumLabelPipe, PricePipe],
  templateUrl: './product-price.component.html',
  styleUrl: './product-price.component.scss',
})
export class ProductPriceComponent implements OnInit, OnDestroy {
  @Input() data!: IProductSpecificationsModel;
  @Input() productId!: number;
  prices!: IPriceViewModel[];
  selectedItems!: IPriceViewModel[];
  cart: any = { cartItems: [] };
  choosedSpec!: IPriceViewModel;
  colors: any[] = [];
  vendors!: any[];
  guaranties!: any[];
  price: number | string = 0;
  isConfirmLoading = false;
  isExist: boolean = false;
  selectedColorId!: number;
  selectedVendorId!: number;
  selectedGuarantyId!: number;
  protected findProductPriceInCart!: ICartItemResponseModel | undefined;
  private productPriceId!: number;
  private _destroy = new Subject<void>();

  constructor(
    private cartService: CartService,
    private toastr: ToastrService,
    private modalService: NgbModal,
  ) {}

  ngOnInit() {
    this.setInitSelectedSpecData();
    this.cartService.updatedCartResult$
      .pipe(takeUntil(this._destroy))
      .subscribe((cart) => {
        this.cart = cart || { cartItems: [] };
        if (this.cart && this.cart.cartItems && this.cart.cartItems.length) {
          this.findProductPriceInCart = this.cart.cartItems.find(
            (p: any) => this.choosedSpec.productPriceId === p.productPriceId,
          );
          this.choosedSpec.count = this.findProductPriceInCart
            ? this.findProductPriceInCart.count
            : 0;
        } else {
          this.cart = { cartItems: [] };
          this.choosedSpec.count = 0;
          this.findProductPriceInCart = undefined;
        }
      });
  }

  getUpdateCart() {
    if (this.choosedSpec.productPriceId)
      this.findProductPriceInCart = this.cart.cartItems.find(
        (p: any) => this.choosedSpec.productPriceId === p.productPriceId,
      );
    if (this.findProductPriceInCart) {
      this.choosedSpec.count = this.findProductPriceInCart.count;
    }
  }

  selectColor(productPriceColorId: number) {
    this.selectedColorId = productPriceColorId;
    this.selectedItems = this.prices.filter(
      (x) => x.productPriceColorId == productPriceColorId,
    );
    this.choosedSpec = this.selectedItems.reduce((previousValue, newValue) => {
      return previousValue.productPricePrice > newValue.productPricePrice
        ? newValue
        : previousValue;
    });
    this.productPriceId = this.choosedSpec.productPriceId;
    this.selectedVendorId = this.choosedSpec.productPriceVendorId;
    this.selectedGuarantyId = this.choosedSpec.productPriceProductGuaranty;
    this.vendors = this.groupBy(
      this.selectedItems ? this.selectedItems : [],
      'productPriceVendorId',
    );
    this.guaranties = this.groupBy(
      this.selectedItems ? this.selectedItems : [],
      'productPriceProductGuaranty',
    );

    this.getUpdateCart();
  }

  selectVendor(productPriceVendorId: number) {
    this.selectedVendorId = productPriceVendorId;
    this.selectedItems = this.prices.filter(
      (x) =>
        x.productPriceColorId === this.selectedColorId &&
        x.productPriceVendorId === productPriceVendorId,
    );
    this.choosedSpec = this.selectedItems.reduce((previousValue, newValue) => {
      return previousValue.productPricePrice > newValue.productPricePrice
        ? newValue
        : previousValue;
    });
    this.guaranties = this.groupBy(
      this.selectedItems ? this.selectedItems : [],
      'productPriceProductGuaranty',
    );
    this.productPriceId = this.choosedSpec.productPriceId;
  }

  selectGuaranty(productPriceProductGuaranty: number) {
    this.selectedGuarantyId = productPriceProductGuaranty;
    this.selectedItems = this.prices.filter(
      (x) =>
        x.productPriceColorId === this.selectedColorId &&
        x.productPriceVendorId === this.selectedVendorId &&
        x.productPriceProductGuaranty === productPriceProductGuaranty,
    );
    this.choosedSpec = this.selectedItems.reduce((previousValue, newValue) => {
      return previousValue.productPricePrice > newValue.productPricePrice
        ? newValue
        : previousValue;
    });

    this.productPriceId = this.choosedSpec.productPriceId;
  }

  setInitSelectedSpecData() {
    this.prices = this.data.prices
      .sort((a, b) => Number(a.productPricePrice) - Number(b.productPricePrice))
      .map(
        (price) =>
          ({
            ...price,
            count: 0,
          }) as IPriceViewModel,
      );

    if (this.prices.length) {
      this.colors = this.groupBy(
        this.prices ? this.prices : [],
        'productPriceColorId',
      );
      this.isExist = !this.prices.every((x) => !x.isExist);
      this.choosedSpec = this.prices.reduce((previousValue, newValue) => {
        return previousValue.productPricePrice > newValue.productPricePrice
          ? newValue
          : previousValue;
      });
      this.selectedVendorId = this.choosedSpec.productPriceVendorId;
      this.selectedGuarantyId = this.choosedSpec.productPriceProductGuaranty;
      this.selectedColorId = this.choosedSpec.productPriceColorId;

      const prices = this.prices.filter(
        (x) => x.productPriceId === this.choosedSpec?.productPriceId,
      );
      this.vendors = this.groupBy(prices ? prices : [], 'productPriceVendorId');
      this.guaranties = this.groupBy(
        prices ? prices : [],
        'productPriceProductGuaranty',
      );
      this.getUpdateCart();
    }
  }

  groupBy(data: any[], key: string): any[] {
    const map = new Map();
    for (const item of data) {
      if (item && !map.has(item[key])) {
        map.set(item[key], item);
      }
    }
    return Array.from(map.values());
  }

  addProductPriceCount(addType: boolean, choosedSpec: IPriceViewModel) {
    if (
      !addType &&
      choosedSpec.count === choosedSpec.productPriceLowestNumberOfOrders
    )
      this.removeFromCart(choosedSpec);
    else this.addCart(addType, choosedSpec);
  }

  removeFromCart(choosedSpec: IPriceViewModel) {
    this.cartService
      .delete(choosedSpec.productPriceId)
      .pipe(takeUntil(this._destroy))
      .subscribe(() => {
        const cartItem = this.cart.cartItems
          .map((x: any) => x.productPriceId)
          .indexOf(this.choosedSpec.productPriceId);
        if (cartItem > -1) {
          this.choosedSpec.count = 0;
          this.findProductPriceInCart = undefined;
          this.cart.cartItems.splice(cartItem, 1);
        }
        this.cartService.setUpdateCartResult(this.cart);
        this.cartService.setUpdateCartModalResult(this.cart);
        this.getUpdateCart();
      });
  }

  addCart(addType: boolean, chooseSpec: IPriceViewModel) {
    const model: ICartModel = {
      productPriceId: chooseSpec.productPriceId,
      count:
        chooseSpec.count >= chooseSpec.productPriceLowestNumberOfOrders
          ? addType
            ? chooseSpec.count + chooseSpec.productPriceLowestNumberOfOrders
            : chooseSpec.count - chooseSpec.productPriceLowestNumberOfOrders
          : chooseSpec.productPriceLowestNumberOfOrders,
    } as ICartModel;

    this.cartService
      .addCart(model)
      .pipe(
        takeUntil(this._destroy),
        finalize(() => (this.isConfirmLoading = false)),
      )
      .subscribe({
        next: () => {
          if (!this.findProductPriceInCart) {
            this.cart.cartItems.push({
              productPriceId: chooseSpec.productPriceId,
              count: model.count,
              price: this.choosedSpec?.productPricePrice,
              productId: this.productId,
              productPersianTitle: this.data.productPersianTitle,
              colorData: this.choosedSpec?.productPriceColorData,
              colorId: this.choosedSpec?.productPriceColorId,
              colorName: this.choosedSpec?.productPriceColorName,
              productGuaranty: this.choosedSpec?.productPriceProductGuaranty,
              vendorDisplayName: this.choosedSpec?.productPriceVendorName,
              lowestNumberOfOrders: chooseSpec.productPriceLowestNumberOfOrders,
              highestNumberOfOrders:
                chooseSpec.productPriceHighestNumberOfOrders,
              imageSrc: this.data.images.find((m) => m.isMainImage)?.imageSrc,
              lastAmount: chooseSpec.lastAmount,
              discountAmount: chooseSpec.discountAmount,
            } as ICartItemResponseModel);

            if (addType)
              this.modalService.open(ConfirmAddToCartDialogComponent);
            // this.getUpdateCart()
          } else this.findProductPriceInCart.count = model.count;

          this.cartService.setUpdateCartResult(this.cart);
          this.cartService.setUpdateCartModalResult(this.cart);
        },
      });
  }

  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();
  }

  protected readonly ProductGuarantyLabel = ProductGuarantyLabel;
}
