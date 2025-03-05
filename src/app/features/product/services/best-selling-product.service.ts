import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBestSellingProductModel } from '../interfaces/bestSellingProduct.model';

@Injectable({
  providedIn: 'root',
})
export class BestSellingProductService {
  constructor(private http: HttpClient) {}

  bestSellingProduct(): Observable<IBestSellingProductModel[]> {
    return this.http.get<IBestSellingProductModel[]>('api/BestSellingProduct');
  }
}
