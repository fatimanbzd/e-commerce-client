// import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
// import {inject, Injectable} from "@angular/core";
// import {Observable} from "rxjs";
// import {AuthService} from "../../shared/services/auth.service";
//
// export const AdminGuard: CanActivateFn = (
//   route: ActivatedRouteSnapshot,
//   state: RouterStateSnapshot
// ):
//   Observable<boolean | UrlTree>
//   | Promise<boolean | UrlTree>
//   | boolean
//   | UrlTree=> {
//   if (inject(AuthService).isLoggedIn()) {
//     return true;
//   } else {
//     return inject(Router).createUrlTree(['/login']);
//   }
//
// };
