import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { CartService } from '../../shared/services/cart.service';
import { map, Observable } from 'rxjs';
import { inject } from '@angular/core';
import { ICartResponseModel } from '../../shared/interfaces/cart-response.model';

export const CartGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
):
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  const router = inject(Router);
  return inject(CartService)
    .carts()
    .pipe(
      map((carts: ICartResponseModel) => {
        const cartAccess = carts && carts.cartItems?.length > 0;
        if (!cartAccess)
          return router.createUrlTree(['/pages/checkout/cart']);

        return cartAccess;
      }),
    );
};
