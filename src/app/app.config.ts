import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import * as authEffects from './shared/store/auth/auth.effects';
import { authFeature } from './shared/store/auth/auth.feature';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideStore(),
    provideState(authFeature),
    provideEffects(authEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideStoreDevtools(),
  ],
};
