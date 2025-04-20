import {Routes} from '@angular/router';
import {HomePageComponent} from './pages/content/home-page/home-page.component';
import {NotFoundComponent} from './shared/components/not-found/not-found.component';
import {AuthGuard} from './auth/gaurds/auth.guard';
import {ProfilePageComponent} from './pages/dashboard/profile-page/profile-page.component';
import {UpdateProfilePageComponent} from './pages/dashboard/update-profile-page/update-profile-page.component';
import {
  ProfileListOrdersPageComponent
} from './pages/dashboard/profile-page/profile-list-orders-page/profile-list-orders-page.component';
import {LocationPageComponent} from './pages/dashboard/location-page/location-page.component';
import {TicketPageComponent} from './pages/dashboard/ticket-page/ticket-page.component';
import {
  ProfileOrderDetailsPageComponent
} from './pages/dashboard/profile-page/profile-order-details-page/profile-order-details-page.component';
import {ProductListPageComponent} from './pages/content/product-page/product-list-page/product-list-page.component';
import {
  ProductDetailPageComponent
} from './pages/content/product-page/product-detail-page/product-detail-page.component';
import {OrderProductPageComponent} from './pages/content/order-page/order-product-page/order-product-page.component';
import {NoProfileGuard} from './auth/gaurds/no-profile.guard';
import {
  OrderRegistrationPageComponent
} from './pages/content/order-page/order-registration-page/order-registration-page.component';
import {permissionGuard} from './auth/gaurds/permission.guard';
import {CartGuard} from './auth/gaurds/cart.guard';
import {
  OrderInformationPageComponent
} from './pages/content/order-page/order-information-page/order-information-page.component';
import {SequentialGuard} from './auth/gaurds/sequential.guard';
import {
  OrderPreInvoicePageComponent
} from './pages/content/order-page/order-pre-invoice-page/order-pre-invoice-page.component';
import {OrderWalletPageComponent} from './pages/content/order-page/order-wallet-page/order-wallet-page.component';

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
          {path: '', redirectTo: 'user-profile', pathMatch: 'full'},
          {path: 'user-profile', component: ProfilePageComponent},
          {path: 'update-profile', component: UpdateProfilePageComponent},
          {path: 'order-detail', component: ProfileListOrdersPageComponent},
          {path: 'location', component: LocationPageComponent},
          {path: 'ticket', component: TicketPageComponent},
          {
            path: ':id/:invoiceNumber',
            component: ProfileOrderDetailsPageComponent,

            data: {
              renderMode: 'ssr',
              breadcrumb: (data: any) => `${data.invoiceNumber}`,
            },
          },
        ],
      },

      {
        path: 'content',
        loadComponent: () =>
          import('./pages/content/content.component').then((m) => m.ContentComponent),
        children: [
          {path: '', redirectTo: 'home', pathMatch: 'full'},
          {path: 'home', component: HomePageComponent},
          {
            path: ':category-:catId/:nodeId',
            component: ProductListPageComponent,
            data: {
              breadcrumb: '',
            }
          },
          {
            path: 'product',
            loadComponent: () =>
              import('./pages/content/product-page/product-page.component').then(
                (m) => m.ProductPageComponent,
              ),
            data: {
              breadcrumb: 'محصولات',
            },
            children: [
              {
                path: ':id/:title',
                component: ProductDetailPageComponent,
                data: {
                  breadcrumb: (data: any) => `${data.title}`,
                },
              },
            ]
          },
        ],
      },

      {
        path: 'checkout',
        loadComponent: () =>
          import('./pages/content/order-page/order-page.component').then(
            (m) => m.OrderPageComponent,
          ),
        children: [
          {path: '', redirectTo: 'cart', pathMatch: 'full'},
          {
            path: 'cart',
            component: OrderProductPageComponent,
          },
          {
            path: 'registration',
            canActivate: [AuthGuard, NoProfileGuard],
            component: OrderRegistrationPageComponent,
          },
          {
            path: 'ship',
            canActivate: [AuthGuard, permissionGuard, CartGuard],
            component: OrderInformationPageComponent,
          },
          {
            path: 'pre-invoice',
            canActivate: [AuthGuard, SequentialGuard, permissionGuard],
            component: OrderPreInvoicePageComponent,
          },
          {
            path: 'wallet',
            canActivate: [AuthGuard, SequentialGuard, permissionGuard],
            component: OrderWalletPageComponent,
          },
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
