import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth-interceptor';
import { baseUrlInterceptor } from './core/interceptors/base-url-interceptor';
import { customPreset } from './customPreset';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([baseUrlInterceptor, authInterceptor])),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: customPreset,
        options: {
          prefix: 'p',
          darkModeSelector: 'none',
            primary: 'blue'
        },
      },
    }),
  ]
};
