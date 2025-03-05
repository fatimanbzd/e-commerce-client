import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

import { Observable } from 'rxjs';
import { OrderNavigationService } from '../../shared/services/order-navigation.service';

export const SequentialGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
):
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  const navigationService = inject(OrderNavigationService);
  const path = route.routeConfig?.path;
  return navigationService.canActivate(path as string);
};
