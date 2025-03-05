import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProductBrands } from '../interfaces/product-brand.model';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  constructor(private http: HttpClient) {}

  brands(): Observable<IProductBrands[]> {
    return this.http.get<IProductBrands[]>('api/Brands');
  }
}
