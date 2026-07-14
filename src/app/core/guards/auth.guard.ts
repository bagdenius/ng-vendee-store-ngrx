import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { authFeature } from '../store/auth/auth.feature';

export const authGuard: CanActivateFn = () => {
  // can add token verification and getting new token by resfresh token
  const store = inject(Store);
  const router = inject(Router);
  return store.select(authFeature.selectIsAuthenticated).pipe(
    map((isAuthenticated) => {
      if (!isAuthenticated) return router.createUrlTree(['/login']);
      return true;
    }),
  );
};
