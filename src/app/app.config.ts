import { ApplicationConfig, LOCALE_ID, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import localePt from '@angular/common/locales/pt';
import { routes } from './app.routes';
import { registerLocaleData } from '@angular/common';
import { provideNgxMask } from 'ngx-mask';
registerLocaleData(localePt);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideNgxMask(),
    { provide: LOCALE_ID, useValue: "pt-BR" }
  ]
};
