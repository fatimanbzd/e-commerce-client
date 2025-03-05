import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDataModel } from '../../home/interfaces/data.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  getCategory(pi: number): Observable<IDataModel> {
    return this.http.get<any>(`api/Data/${pi}`);
  }
}
