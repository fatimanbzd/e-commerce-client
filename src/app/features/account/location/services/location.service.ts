import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import {
  IAllLocationResponseModel,
  ILocationResponseModel,
} from '../interfaces/location-response.model';
import { ILocationModel } from '../interfaces/location.model';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private readonly URL = 'api/locations';

  private _locationUpdatedSubject = new Subject<void>();
  locationUpdated$ = this._locationUpdatedSubject.asObservable();

  constructor(private http: HttpClient) {}

  locations(): Observable<IAllLocationResponseModel[]> {
    return this.http.get<IAllLocationResponseModel[]>(`${this.URL}/All`);
  }

  location(id: number): Observable<ILocationResponseModel> {
    return this.http.get<ILocationResponseModel>(`${this.URL}/${id}`);
  }

  add(location: ILocationModel): Observable<void> {
    return this.http.post<void>(this.URL, location);
  }

  update(location: ILocationModel, id: number): Observable<void> {
    return this.http.put<void>(`${this.URL}/${id}`, location);
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.URL}/${id}`);
  }

  setDefault(id: number): Observable<void> {
    return this.http.put<void>(`${this.URL}/${id}/Default`, {});
  }

  setLocationUpdated() {
    this._locationUpdatedSubject.next();
  }
}
