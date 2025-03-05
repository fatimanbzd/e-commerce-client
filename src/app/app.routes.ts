import { Routes } from '@angular/router';
import {NoAuthGuard} from './auth/gaurds/no-auth.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'pages' },
  {
    path: 'pages',
    loadChildren: () =>
      import('../../src/app/pages/pages.routes').then((m) => m.Pages_ROUTES),
  },
  {
    path: 'login',
    canActivate: [NoAuthGuard],
    loadComponent: () =>
      import('../../src/app/auth/components/login/login.component').then(
        (m) => m.LoginComponent,
      ),
  },
];
