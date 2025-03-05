import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
):
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  const isAuthentication = inject(AuthService).isLoggedIn();
  if (!isAuthentication) {
    return inject(Router).navigate(['/login'], {
      queryParams: { redirectUrl: state.url },
    });
  }
  return true;
};
