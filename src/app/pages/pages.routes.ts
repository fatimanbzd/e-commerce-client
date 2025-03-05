import { Routes } from '@angular/router';
import { ProfilePageComponent } from './dashboard/profile-page/profile-page.component';
import { UpdateProfilePageComponent } from './dashboard/update-profile-page/update-profile-page.component';
import { LocationPageComponent } from './dashboard/location-page/location-page.component';
import { PagesComponent } from './pages.component';
import { NotFoundComponent } from '@core/components/not-found/not-found.component';
import { HomePageComponent } from './content/home-page/home-page.component';
import { AuthGuard } from '../auth/gaurds/auth.guard';

import { ProductListPageComponent } from './content/product-page/product-list-page/product-list-page.component';
import { ProductDetailPageComponent } from './content/product-page/product-detail-page/product-detail-page.component';
import { OrderProductPageComponent } from './content/order-page/order-product-page/order-product-page.component';
import { OrderInformationPageComponent } from './content/order-page/order-information-page/order-information-page.component';
import { OrderPreInvoicePageComponent } from './content/order-page/order-pre-invoice-page/order-pre-invoice-page.component';
import { OrderWalletPageComponent } from './content/order-page/order-wallet-page/order-wallet-page.component';

import { ProfileOrderDetailsPageComponent } from './dashboard/profile-page/profile-order-details-page/profile-order-details-page.component';
import { ProfileListOrdersPageComponent } from './dashboard/profile-page/profile-list-orders-page/profile-list-orders-page.component';
import { OrderRegistrationPageComponent } from './content/order-page/order-registration-page/order-registration-page.component';
import { permissionGuard } from '../auth/gaurds/permission.guard';
import { CartGuard } from '../auth/gaurds/cart.guard';
import { SequentialGuard } from '../auth/gaurds/sequential.guard';
import { NoProfileGuard } from '../auth/gaurds/no-profile.guard';
import { RulesPageComponent } from './content/footer-items-page/rules-page/rules-page.component';
import { PrivacyPageComponent } from './content/footer-items-page/privacy-page/privacy-page.component';
import { AboutUsPageComponent } from './content/footer-items-page/about-us-page/about-us-page.component';
import { ContactUsPageComponent } from './content/footer-items-page/contact-us-page/contact-us-page.component';
import { QuestionsPageComponent } from './content/footer-items-page/questions-page/questions-page.component';
import { InstructionOrderRegistrationPageComponent } from './content/footer-items-page/instruction-order-registration-page/instruction-order-registration-page.component';
import { TicketPageComponent } from './dashboard/ticket-page/ticket-page.component';
import { TicketDetailsPageComponent } from './dashboard/ticket-page/ticket-details-page/ticket-details-page.component';

export const Pages_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'content',
    pathMatch: 'full',
  },
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./dashboard/dashboard.component').then(
            (m) => m.DashboardComponent,
          ),
        canActivate: [AuthGuard],
        children: [
          { path: '', redirectTo: 'user-profile', pathMatch: 'full' },
          { path: 'user-profile', component: ProfilePageComponent },
          { path: 'update-profile', component: UpdateProfilePageComponent },
          { path: 'order-detail', component: ProfileListOrdersPageComponent },
          {
            path: ':id/:invoiceNumber',
            component: ProfileOrderDetailsPageComponent,

            data: {
              renderMode: 'ssr',
              breadcrumb: (data: any) => `${data.invoiceNumber}`,
            },
          },
          { path: 'location', component: LocationPageComponent },
          { path: 'ticket', component: TicketPageComponent },
          {
            path: ':ticketId',
            component: TicketDetailsPageComponent,
            data: {
              renderMode: 'ssr',
              breadcrumb: (data: any) => `${data.ticketId}`,
            },
          },
        ],
      },
      // Content routes,
      {
        path: 'content',
        loadComponent: () =>
          import('./content/content.component').then((m) => m.ContentComponent),
        children: [
          { path: '', redirectTo: 'home', pathMatch: 'full' },
          { path: 'home', component: HomePageComponent },
          // Product routes
          {
            path: 'products',
            loadComponent: () =>
              import('./content/product-page/product-page.component').then(
                (m) => m.ProductPageComponent,
              ),
            data: {
              breadcrumb: 'محصولات',
            },
            children: [
              {
                path: '',
                redirectTo: 'q-kala/category-digital/mobile',
                pathMatch: 'full',
              },
              {
                path: 'q-kala',
                component: ProductListPageComponent,
                data: {
                  breadcrumb: 'کیوکالا',
                },
                children: [
                  {
                    path: 'category-digital',
                    component: ProductListPageComponent,
                    data: {
                      breadcrumb: 'کالای دیجیتال',
                    },
                    children: [
                      {
                        path: 'mobile',
                        component: ProductListPageComponent,
                        data: {
                          breadcrumb: 'موبایل',
                        },
                      },
                    ],
                  },
                ],
              },
              {
                path: ':id/:title',
                component: ProductDetailPageComponent,
                data: {
                  renderMode: 'ssr',
                  breadcrumb: (data: any) => `${data.title}`,
                },
              },
            ],
          },
          // Order routes
          {
            path: 'order',
            loadComponent: () =>
              import('./content/order-page/order-page.component').then(
                (m) => m.OrderPageComponent,
              ),
            children: [
              { path: 'cart', component: OrderProductPageComponent },
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
          // Footer routes
          {
            path: 'footer-items',
            loadComponent: () =>
              import(
                './content/footer-items-page/footer-items-page.component'
              ).then((m) => m.FooterItemsPageComponent),
            children: [
              {
                path: 'rules',
                component: RulesPageComponent,
                data: {
                  breadcrumb: 'قوانین و مقررات',
                },
              },
              {
                path: 'privacy',
                component: PrivacyPageComponent,
                data: {
                  breadcrumb: 'حریم خصوصی',
                },
              },
              {
                path: 'about-us',
                component: AboutUsPageComponent,
                data: {
                  breadcrumb: 'درباره ما',
                },
              },
              {
                path: 'contact-us',
                component: ContactUsPageComponent,
                data: {
                  breadcrumb: 'تماس با ما',
                },
              },
              {
                path: 'questions',
                component: QuestionsPageComponent,
                data: {
                  breadcrumb: 'پرسش های متداول',
                },
              },
              {
                path: 'instruction-order-registration',
                component: InstructionOrderRegistrationPageComponent,
                data: {
                  breadcrumb: 'نحوه ثبت سفارش',
                },
              },
            ],
          },
        ],
      },
    ],
  },
  { path: 'not_found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not_found' },
];
