import {
  ApplicationConfig,
  isDevMode,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideNgToast } from 'ng-angular-popup';

import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import * as authEffects from './core/store/auth/auth.effects';
import { authFeature } from './core/store/auth/auth.feature';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideStore(),
    provideState(authFeature),
    provideEffects(authEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideStoreDevtools(),
    provideNgToast({
      duration: 3000,
      position: 'toaster-top-center',
      minWidth: 300,
    }),
  ],
};
