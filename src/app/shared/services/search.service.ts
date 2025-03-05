import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProductSearchResponseModel } from '../interfaces/product-search.model';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}

  productSearch(name: string): Observable<IProductSearchResponseModel[]> {
    return this.http.get<IProductSearchResponseModel[]>('api/GlobalSearch', {
      params: {
        searchQuery: name,
      },
    });
  }
}
