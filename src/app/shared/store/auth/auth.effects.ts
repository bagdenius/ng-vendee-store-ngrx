import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { authActions } from './auth.actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { extractTokenPayload } from '../../utils/extract-token.util';
import { NgToastService } from 'ng-angular-popup';

export const loginEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    toaster = inject(NgToastService),
  ) =>
    actions$.pipe(
      ofType(authActions.login),
      switchMap((loginModel) =>
        authService.login(loginModel).pipe(
          map((response) => authActions.loginSuccess(response)),
          catchError((error) => {
            toaster.danger(
              'Provided username or password is invalid',
              'Logging in failed!',
            );
            return of(
              authActions.loginFailure({
                error:
                  error.error?.message ??
                  error.message ??
                  'Something went wrong',
              }),
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
      tap(({ token }) => {
        // test flow with local storage
        const payload = extractTokenPayload(token);
        if (payload) {
          localStorage.setItem('ngrxstore:accessToken', token);
          localStorage.setItem('ngrxstore:userId', payload.sub.toString());
          localStorage.setItem('ngrxstore:username', payload.user);
        }

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
      switchMap((signupModel) =>
        authService.signup(signupModel).pipe(
          map(({ username }) => authActions.signupSuccess({ username })),
          catchError((error) => {
            toaster.danger('Something went wrong :(', 'Signing in failed!');
            return of(
              authActions.signupFailure({
                error:
                  error.error?.message ??
                  error.message ??
                  'Something went wrong',
              }),
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
