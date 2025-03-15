import {Inject, Injectable, PLATFORM_ID, TransferState} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IProfileListOrdersModel} from '../interfaces/profile-list-orders.model';
import {IProfileOrderDetailsModel} from '../interfaces/profile-order-details.model';
import {IListModel} from '../../../../shared/interfaces/list.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient,
              private transferState: TransferState,
              @Inject(PLATFORM_ID) private platformId: object ) {}

  listOrders(
    pageNumber: number,
    pageSize: number,
  ): Observable<IListModel<IProfileListOrdersModel>> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

      return this.http.get<IListModel<IProfileListOrdersModel>>('api/invoices', {
        params,
      })
  }

  profileOrderDetails(
    invoiceId: number,
  ): Observable<IProfileOrderDetailsModel | null> {

      return this.http.get<IProfileOrderDetailsModel>(`api/invoices/${invoiceId}`);
  }

}
