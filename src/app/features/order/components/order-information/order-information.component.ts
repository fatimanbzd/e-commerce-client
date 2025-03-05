import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OnlyNumberDirective } from '@core/directives/only-number.directive';
import { fromEvent, Subject, takeUntil } from 'rxjs';
import { CartService } from '../../../../shared/services/cart.service';
import { ICartResponseModel } from '../../../../shared/interfaces/cart-response.model';
import { ILocationResponseModel } from '../../../../shared/interfaces/location-response.model';
import { LocationService } from '../../../../shared/services/location.service';
import { LocationUpdateDialogComponent } from '../../../../shared/components/location-update-dialog/location-update-dialog.component';
import { NgClass } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FullSrcPipe } from '@core/pipes/full-src.pipe';
import { AuthService } from '../../../../auth/services/auth.service';
import { Utilities } from '@core/Utils/utilities';
import { Router } from '@angular/router';
import { OrderNavigationService } from '../../../../shared/services/order-navigation.service';

@Component({
  selector: 'app-order-information',
  imports: [
    OnlyNumberDirective,
    FormsModule,
    ReactiveFormsModule,
    FullSrcPipe,
    NgClass,
  ],
  templateUrl: './order-information.component.html',
  styleUrl: './order-information.component.scss',
})
export class OrderInformationComponent implements OnInit, OnDestroy {
  locationList: ILocationResponseModel[] = [];
  groupedItems: any[] = [];
  cartList!: ICartResponseModel;
  form!: FormGroup;
  formAddress!: FormGroup;
  ownerList = [
    { value: true, title: 'خودم', name: 'btnRadioSelf' },
    {
      value: false,
      title: 'دیگری',
      name: 'btnRadioOther',
    },
  ];
  ownerSelected: boolean = true;
  private _destroy = new Subject<void>();

  constructor(
    private modalService: NgbModal,
    private locationService: LocationService,
    private cartService: CartService,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private orderNavigation: OrderNavigationService,
  ) {
    this.submittedForm();
    this.getUpdateCart();

    fromEvent(window, 'popstate')
      .pipe(takeUntil(this._destroy))
      .subscribe(() => {
        this.router.navigateByUrl('/pages/content/order/cart');
      });
  }

  submittedForm() {
    this.cartService.getFormData$
      .pipe(takeUntil(this._destroy))
      .subscribe(() => {
        this.addCartCheckout();
      });
  }

  changeGetter(isSelf: boolean) {
    if (isSelf && this.authService.getUserAuthenticated()) {
      // @ts-ignore
      this.form.patchValue(this.authService.getUserAuthenticated());
    } else
      this.form.patchValue({
        name: '',
        family: '',
        mobileNumber: '',
        nationalNumber: '',
      });
  }

  getUpdateCart() {
    this.cartService.updatedCartResult$
      .pipe(takeUntil(this._destroy))
      .subscribe((carts) => {
        if (carts) {
          this.cartList = carts;
          if (carts && carts.cartItems && carts.cartItems.length > 0)
            this.groupedItems = this.groupBy(
              this.cartList.cartItems,
              'vendorDisplayName',
              'sendType',
            );
        }
      });
  }

  ngOnInit() {
    this.orderNavigation.completeStep('ship');
    this.getAddressList();
    this.initForm();
    this.initFormAddress();
    this.initialData();

    fromEvent(window, 'popstate')
      .pipe(takeUntil(this._destroy))
      .subscribe(() => {
        this.router.navigateByUrl('/pages/content/order/cart', {
          replaceUrl: true,
        });
      });
  }

  initialData() {
    if (this.authService.getUserAuthenticated()) {
      // @ts-ignore
      this.form.patchValue(this.authService.getUserAuthenticated());
    }
  }

  initForm() {
    this.form = this.fb.group({
      name: [null, Validators.required],
      family: [null, Validators.required],
      mobileNumber: [
        null,
        [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11),
        ],
      ],
      nationalNumber: [
        null,
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      phoneNumber: [null, [Validators.minLength(11), Validators.maxLength(11)]],
      locationId: [null, Validators.required],
      description: [null],
    });
  }

  initFormAddress() {
    this.formAddress = this.fb.group({
      provinceTitle: [{ value: null, disabled: true }, Validators.required],
      cityTitle: [{ value: null, disabled: true }, Validators.required],
      postalCode: [{ value: null, disabled: true }, Validators.required],
      address: [{ value: null, disabled: true }, Validators.required],
    });
  }

  groupBy(data: any[], key: string, filterKey: string): any[] {
    const resultMap = new Map();

    data.forEach((item) => {
      if (!item) return;
      const keyValue = item[key];
      const sendTypeValue = item[filterKey];
      if (!resultMap.has(keyValue)) {
        resultMap.set(keyValue, {
          key: keyValue,
          sendTypeItems: [{ sendType: sendTypeValue, products: [item] }],
        });
      } else {
        const sendTypeItems = resultMap.get(keyValue).sendTypeItems;
        const sendTypeItem = sendTypeItems.find(
          (x: any) => x.sendType === sendTypeValue,
        );

        if (!sendTypeItem) {
          sendTypeItems.push({ sendType: sendTypeValue, products: [item] });
        } else {
          sendTypeItem.products.push(item);
        }
      }
    });
    return Array.from(resultMap.values());
  }

  getAddressList() {
    this.locationService
      .locations()
      .pipe(takeUntil(this._destroy))
      .subscribe((loc) => {
        this.locationList = loc;
      });
  }

  openAddModel() {
    const modalRef = this.modalService.open(LocationUpdateDialogComponent);
    modalRef.result.then((result: boolean) => {
      if (result) {
        this.getAddressList();
      }
    });
  }

  getAddress(id: string | number | null) {
    if (id != null && id != 'null')
      this.locationService
        .locationsById(+id)
        .pipe(takeUntil(this._destroy))
        .subscribe((loc) => {
          this.formAddress.patchValue(loc);
        });
    else {
      this.form.get('locationId')?.setValue(null);
      this.formAddress.reset();
    }
  }

  addCartCheckout() {
    if (this.form.invalid) {
      Utilities.checkValidation(this.form);
      return;
    }
    const resetCartModel = {
      hasData: false,
      cartNumber: '',
      cartItems: [],
      totalPrice: 0,
    } as ICartResponseModel;

    this.cartService
      .addCartCheckout(this.form.value)
      .pipe(takeUntil(this._destroy))
      .subscribe(() => {
        this.orderNavigation.completeStep('ship');
        this.cartService.setUpdateCartModalResult(resetCartModel);

        this.cartService.setUpdateCartModalResult(resetCartModel);
        this.resetForm();

        this.resetForm();
        this.router.navigateByUrl('/pages/content/order/pre-invoice');
      });
  }

  isLastItem(items: any[], currentItem: any): boolean {
    return items.indexOf(currentItem) === items.length - 1;
  }

  resetForm() {
    this.formAddress.reset();
    this.form.reset();
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }
}
