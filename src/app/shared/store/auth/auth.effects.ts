import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { authActions } from './auth.actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';

export const loginEffect = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) =>
    actions$.pipe(
      ofType(authActions.login),
      switchMap((loginModel) =>
        authService.login(loginModel).pipe(
          map((response) => authActions.loginSuccess(response)),
          catchError((error) =>
            of(
              authActions.loginFailure({
                error:
                  error.error?.message ??
                  error.message ??
                  'Something went wrong',
              }),
            ),
          ),
        ),
      ),
    ),
  { functional: true },
);

export const loginSuccessEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) =>
    actions$.pipe(
      ofType(authActions.loginSuccess),
      tap(() => void router.navigateByUrl('/products')),
    ),
  { functional: true, dispatch: false },
);

export const signupEffect = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) =>
    actions$.pipe(
      ofType(authActions.signup),
      switchMap((signupModel) =>
        authService.signup(signupModel).pipe(
          map(({ username }) => authActions.signupSuccess({ username })),
          catchError((error) =>
            of(
              authActions.signupFailure({
                error:
                  error.error?.message ??
                  error.message ??
                  'Something went wrong',
              }),
            ),
          ),
        ),
      ),
    ),
  { functional: true },
);

export const signupSuccessEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) =>
    actions$.pipe(
      ofType(authActions.signupSuccess),
      tap(
        ({ username }) =>
          void router.navigate(['/login'], { queryParams: { username } }),
      ),
    ),
  { functional: true, dispatch: false },
);
