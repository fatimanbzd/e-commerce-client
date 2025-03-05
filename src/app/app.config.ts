import {ApplicationConfig, importProvidersFrom, isDevMode, LOCALE_ID, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideClientHydration} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {httpsRequestInterceptor} from './interceptors/https-path-resolver.interceptor';
import {customerErrorHandlingInterceptor} from './interceptors/error-handling.interceptor';
import {LoaderInterceptor} from './interceptors/loader.interceptor';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {environment} from '../environments/environment';
import {AuthInterceptor} from './interceptors/auth.interceptor';
import {provideToastr} from 'ngx-toastr';
import { provideServiceWorker } from '@angular/service-worker';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom(FormsModule),
    provideToastr({
      timeOut: 10000,
      positionClass: 'toast-bottom-left',
      preventDuplicates: true,
    }),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: httpsRequestInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: customerErrorHandlingInterceptor,
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide: 'environment', useValue: environment },

    { provide: LocationStrategy, useClass: HashLocationStrategy },

    { provide: LOCALE_ID, useValue: 'fa-IR' }, provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
          }),

    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ]
};
