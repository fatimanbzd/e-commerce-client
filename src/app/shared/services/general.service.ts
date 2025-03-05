import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICityModel, IProvinceModel } from '../interfaces/general.model';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  constructor(private http: HttpClient) {}

  provinces(): Observable<IProvinceModel[]> {
    return this.http.get<IProvinceModel[]>('api/provinces/All');
  }

  citiesByProvinceCode(provinceCode: number): Observable<ICityModel[]> {
    return this.http.get<ICityModel[]>(`api/provinces/${provinceCode}/cities`);
  }
}
