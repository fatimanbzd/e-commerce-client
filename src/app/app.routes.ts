import {Routes} from '@angular/router';
import {HomePageComponent} from './pages/content/home-page/home-page.component';
import {NotFoundComponent} from './shared/components/not-found/not-found.component';
import {AuthGuard} from './auth/gaurds/auth.guard';
import {ProfilePageComponent} from './pages/dashboard/profile-page/profile-page.component';
import {UpdateProfilePageComponent} from './pages/dashboard/update-profile-page/update-profile-page.component';
import {
  ProfileListOrdersPageComponent
} from './pages/dashboard/profile-page/profile-list-orders-page/profile-list-orders-page.component';

export const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'pages'},
  {
    path: 'pages',
    loadComponent:
      () =>
        import('../../src/app/pages/pages.component').then((m) => m.PagesComponent),
    children: [
      {
        path: '',
        redirectTo: 'content',
        pathMatch: 'full',
      },

      {
        path: 'dashboard',
        loadComponent: () =>
          import('../../src/app/pages/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent,
          ),
        canActivate: [AuthGuard],
        children: [
          { path: '', redirectTo: 'user-profile', pathMatch: 'full' },
          { path: 'user-profile', component: ProfilePageComponent },
          { path: 'update-profile', component: UpdateProfilePageComponent },
          { path: 'order-detail', component: ProfileListOrdersPageComponent},
        ],
      },

      {
        path: 'content',
        loadComponent: () =>
          import('./../app/pages/content/content.component').then((m) => m.ContentComponent),
        children: [
          {path: '', redirectTo: 'home', pathMatch: 'full'},
          {path: 'home', component: HomePageComponent},

        ],
      },
    ]
  },
  {
    path: 'login',
    loadComponent: () =>
      import('../../src/app/auth/components/login/login.component').then(
        (m) => m.LoginComponent,
      ),
  },
  {
    path: 'not_found',
    component: NotFoundComponent
  },
  {path: '**', redirectTo: 'not_found'},
];
