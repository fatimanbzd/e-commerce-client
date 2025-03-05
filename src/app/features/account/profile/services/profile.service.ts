import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProfileListOrdersModel } from '../interfaces/profile-list-orders.model';
import { IProfileOrderDetailsModel } from '../interfaces/profile-order-details.model';
import { IListModel } from '../../../../shared/interfaces/list.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  listOrders(
    pageNumber: number,
    pageSize: number,
  ): Observable<IListModel<IProfileListOrdersModel>> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<IListModel<IProfileListOrdersModel>>('api/invoices', {
      params,
    });
  }

  profileOrderDetails(
    invoiceId: number,
  ): Observable<IProfileOrderDetailsModel> {
    return this.http.get<any>(`api/invoices/${invoiceId}`);
  }

}
