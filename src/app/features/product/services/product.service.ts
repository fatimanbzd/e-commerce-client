import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Params } from '@angular/router';
import { IProductSpecificationsModel } from '../interfaces/productSpecifications.model';
import { IProductRelatedModel } from '../interfaces/productRelated.model';
import { IListModel } from '../../../shared/interfaces/list.model';
import { IProductResponseModel } from '../interfaces/product-response.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private _filterProductSubject = new BehaviorSubject<boolean>(true);
  filterProduct$ = this._filterProductSubject.asObservable();

  constructor(private http: HttpClient) {}

  products(
    filter: Params,
    pageSize = 10,
  ): Observable<IListModel<IProductResponseModel>> {
    return this.http.get<any>('api/Search', {
      params: { ...filter, pageSize: pageSize },
    });
  }

  filterProduct(value: boolean) {
    this._filterProductSubject.next(value);
  }

  productSpecifications(pi: number): Observable<IProductSpecificationsModel> {
    return this.http.get<any>(`api/product/${pi}`);
  }

  productRelated(pi: number): Observable<IProductRelatedModel> {
    return this.http.get<any>(`api/product/${pi}/related`);
  }
}
