import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, EMPTY, Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TokenStorageService } from '../auth/services/token-storage.service';
import {IEnvironmentModel} from '../shared/interfaces/environment.model';

@Injectable({
  providedIn: 'root',
})
export class customerErrorHandlingInterceptor implements HttpInterceptor {
  constructor(
    private toastService: ToastrService,
    @Inject('environment') private environment: IEnvironmentModel,
    private tokenStorageService: TokenStorageService,
    private router: Router,
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.handle401();
        } else {
          if (error?.error) this.toastService.error(error?.error?.Title);
        }
        return throwError(() => error);
      }),
    );
  }

  private handle401() {
    this.tokenStorageService.removeTokens();
    this.router.navigate(['/login']);
    return EMPTY;
  }
}
