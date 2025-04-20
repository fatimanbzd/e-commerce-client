import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { TokenStorageService } from '../auth/services/token-storage.service';
import { UserInformationStorageService } from '../auth/services/user-information-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private tokenStorageService: TokenStorageService,
    private userInformationStorageService: UserInformationStorageService,
    private router: Router,
  ) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    const accessToken = this.tokenStorageService.getAccessToken();
    if (accessToken) {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${accessToken.token}` },
      });
    }

    return next.handle(req).pipe((s) => this.handleErrors(s, req.url));
  }

  private handleErrors(
    source: Observable<HttpEvent<unknown>>,
    urlPath: string,
  ): Observable<HttpEvent<unknown>> {
    return source.pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.handle401();
        }

        return throwError(() => error);
      }),
    );
  }

  private handle401() {
    this.tokenStorageService.removeTokens();
    this.userInformationStorageService.removeUserInformation();
    this.router.navigateByUrl('/content/home');
    return EMPTY;
  }
}
