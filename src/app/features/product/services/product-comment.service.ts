import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IListModel } from '../../../shared/interfaces/list.model';
import {
  IProductCommentAddModel,
  IProductCommentResponseModel,
} from '../interfaces/product-comment.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductCommentService {
  constructor(private http: HttpClient) {}

  comments(
    pi: number,
    pageNumber: number = 1,
    pageSize: number = 10,
  ): Observable<IListModel<IProductCommentResponseModel>> {
    return this.http.get<IListModel<IProductCommentResponseModel>>(
      `api/product/${pi}/Comment`,
      {
        params: { pageNumber: pageNumber, pageSize: pageSize },
      },
    );
  }

  add(model: IProductCommentAddModel, pi: number) {
    return this.http.post(`api/product/${pi}/Comment`, model);
  }
}
