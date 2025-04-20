import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ICategoryMenuModel} from '../interfaces/data.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  data(pi: number): Observable<ICategoryMenuModel> {
    return this.http.get<any>(`api/Data/${pi}`);
  }
}
