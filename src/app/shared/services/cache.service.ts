import {Inject, Injectable, makeStateKey, PLATFORM_ID, TransferState} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {isPlatformBrowser} from '@angular/common';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  constructor(
    private http: HttpClient,
    private transferState: TransferState,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  get<T>(apiUrl: string, params?: HttpParams): Observable<T | null> {
    const key = makeStateKey<T>(apiUrl);


    if (this.transferState.hasKey(key)) {
      return of(this.transferState.get<T | null>(key, null));
    }

    if (isPlatformBrowser(this.platformId)) {
      return this.http.get<T>(apiUrl, { params }).pipe(
        tap((data) => {
          this.transferState.set(key, data);
        }),
        catchError((error) => {
          console.error('Error fetching data from API:', error);
          return of(null as T);
        })
      );
    }

    return of(null as T);
  }
}
