import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IOrderWalletResponseModel } from '../interfaces/order-wallet.model';

@Injectable({
  providedIn: 'root',
})
export class OrderWalletService {
  constructor(private http: HttpClient) {}

  Wallets(): Observable<IOrderWalletResponseModel[]> {
    return this.http.get<IOrderWalletResponseModel[]>('api/Customers/wallets');
  }
}
