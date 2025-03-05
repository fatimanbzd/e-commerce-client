import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, ReplaySubject, Subject, tap } from 'rxjs';
import { ICartResponseModel } from '../interfaces/cart-response.model';
import { ICartModel } from '../interfaces/cart.model';
import { ICartCheckoutModel } from '../interfaces/cart-checkout.model';
import { IOrderPaymentModel } from '../../features/order/interfaces/order-wallet.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private _setFormData = new Subject<boolean>();
  getFormData$ = this._setFormData.asObservable();

  private _setWalletForm = new Subject<void>();
  getWalletForm$ = this._setWalletForm.asObservable();

  private _registeredSubject = new Subject<void>();
  registered$ = this._registeredSubject.asObservable();

  private _updateCartResultSubject = new BehaviorSubject<ICartResponseModel>({
    hasData: false,
    cartNumber: '',
    cartItems: [],
    totalPrice: 0,
  } as ICartResponseModel);
  updatedCartResult$ = this._updateCartResultSubject.asObservable();

  private _updateCartModalResultSubject = new ReplaySubject<ICartResponseModel>(
    1,
  );
  updatedCartModalResult$ = this._updateCartModalResultSubject.asObservable();

  constructor(private http: HttpClient) {}

  setUpdateCartResult(cartItem: ICartResponseModel) {
    this._updateCartResultSubject.next(cartItem);
  }

  setUpdateCartModalResult(cartItem: ICartResponseModel) {
    this._updateCartModalResultSubject.next(cartItem);
  }

  setRegistrationForm() {
    this._registeredSubject.next();
  }

  carts() {
    return this.http
      .get<ICartResponseModel>(`api/cart`, {
        withCredentials: true,
      })
      .pipe(
        tap((c) => {
          this.setUpdateCartResult(c);
        }),
      );
  }

  delete(productPriceId: number) {
    return this.http.delete(`api/cart/items/${productPriceId}`, {
      withCredentials: true,
    });
  }

  addCart(body: ICartModel): Observable<void> {
    return this.http.post<void>(`api/cart`, body, { withCredentials: true });
  }

  setFormData(value: boolean) {
    this._setFormData.next(value);
  }

  setWalletForm() {
    this._setWalletForm.next();
  }

  payment(walletAddresses: IOrderPaymentModel[]) {
    return this.http.post('api/invoices/pay', walletAddresses);
  }

  addCartCheckout(model: ICartCheckoutModel): Observable<void> {
    return this.http.post<void>(`api/cart/checkout`, model, {
      withCredentials: true,
    });
  }
}
