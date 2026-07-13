import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../../services/user.service';
import { userActions } from './user.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { getErrorMessage } from '../../../shared/utils/get-error-message.util';

export const loadUserEffect = createEffect(
  (actions$ = inject(Actions), userService = inject(UserService)) =>
    actions$.pipe(
      ofType(userActions.load),
      switchMap(({ userId }) =>
        userService.get(userId).pipe(
          map((user) => userActions.loadSuccess({ user })),
          catchError((error) =>
            of(userActions.loadFailure({ error: getErrorMessage(error) })),
          ),
        ),
      ),
    ),
  { functional: true },
);
