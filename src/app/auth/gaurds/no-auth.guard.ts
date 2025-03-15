import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree,} from '@angular/router';
import {Observable} from 'rxjs';
import {inject} from '@angular/core';
import {AuthService} from '../services/auth.service';

export const NoAuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
):
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  const router = inject(Router);
  const isAuthentication = inject(AuthService).isLoggedIn();
  debugger
  if (isAuthentication)  return router.createUrlTree(['/pages/content']);
  return !isAuthentication;
};
