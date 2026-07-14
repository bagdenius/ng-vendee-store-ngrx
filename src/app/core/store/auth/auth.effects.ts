import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { authActions } from './auth.actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { extractTokenPayload } from '../../../shared/utils/extract-token.util';
import { NgToastService } from 'ng-angular-popup';
import { getErrorMessage } from '../../../shared/utils/get-error-message.util';

export const loginEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    toaster = inject(NgToastService),
  ) =>
    actions$.pipe(
      ofType(authActions.login),
      switchMap(({ loginData }) =>
        authService.login(loginData).pipe(
          map(({ token }) => {
            const payload = extractTokenPayload(token);
            if (!payload?.sub) throw new Error('Invalid token');

            return authActions.loginSuccess({
              token,
              userId: Number(payload?.sub),
            });
          }),
          catchError((error) => {
            // better to take out the toaster to login failure effect tap pipe
            toaster.danger(
              'Provided username or password is invalid',
              'Logging in failed!',
            );
            return of(
              authActions.loginFailure({ error: getErrorMessage(error) }),
            );
          }),
        ),
      ),
    ),
  { functional: true },
);

export const loginSuccessEffect = createEffect(
  (
    actions$ = inject(Actions),
    router = inject(Router),
    toaster = inject(NgToastService),
  ) =>
    actions$.pipe(
      ofType(authActions.loginSuccess),
      tap(({ token, userId }) => {
        localStorage.setItem('ngrxstore:accessToken', token);
        localStorage.setItem('ngrxstore:userId', userId.toString());

        toaster.success(
          'Welcome and happy shopping!',
          'Logged in successfully!',
        );
        router.navigateByUrl('/products');
      }),
    ),
  { functional: true, dispatch: false },
);

export const signupEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    toaster = inject(NgToastService),
  ) =>
    actions$.pipe(
      ofType(authActions.signup),
      switchMap(({ signupData }) =>
        authService.signup(signupData).pipe(
          map(({ username }) => authActions.signupSuccess({ username })),
          catchError((error) => {
            // better to take out the toaster to singup failure effect tap pipe
            toaster.danger('Something went wrong :(', 'Signing in failed!');
            return of(
              authActions.signupFailure({ error: getErrorMessage(error) }),
            );
          }),
        ),
      ),
    ),
  { functional: true },
);

export const signupSuccessEffect = createEffect(
  (
    actions$ = inject(Actions),
    router = inject(Router),
    toaster = inject(NgToastService),
  ) =>
    actions$.pipe(
      ofType(authActions.signupSuccess),
      tap(({ username }) => {
        toaster.success('Log in to start shopping!', 'Signed in successfully!');
        void router.navigate(['/login'], { queryParams: { username } });
      }),
    ),
  { functional: true, dispatch: false },
);

export const logoutEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    router = inject(Router),
    toaster = inject(NgToastService),
  ) =>
    actions$.pipe(
      ofType(authActions.logout),
      switchMap(() =>
        authService.logout().pipe(
          map(() => {
            // better to take out the routing and toaster to logout failure effect tap pipe
            toaster.success(
              'Logged out successfully!',
              "We'll be glad to see you again!",
            );
            router.navigateByUrl('/login');
            return authActions.logoutSuccess();
          }),
          catchError((error) => {
            // better to take out the toaster to logout failure effect tap pipe
            toaster.danger('Something went wrong :(', 'Logging out failed!');
            return of(
              authActions.logoutFailure({ error: getErrorMessage(error) }),
            );
          }),
        ),
      ),
    ),
  { functional: true },
);
