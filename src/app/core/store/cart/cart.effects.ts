import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, debounceTime, map, of, switchMap } from 'rxjs';
import { getErrorMessage } from '../../../shared/utils/get-error-message.util';
import { CartService } from '../../services/cart.service';
import { cartActions } from './cart.actions';

export const loadCartEffect = createEffect(
  (actions$ = inject(Actions), cartService = inject(CartService)) =>
    actions$.pipe(
      ofType(cartActions.load),
      switchMap(() =>
        cartService.get().pipe(
          map((items) => cartActions.loadSuccess({ items })),
          catchError((error) =>
            of(cartActions.loadFailure({ error: getErrorMessage(error) })),
          ),
        ),
      ),
    ),
  { functional: true },
);

export const addItemToCartEffect = createEffect(
  (actions$ = inject(Actions), cartService = inject(CartService)) =>
    actions$.pipe(
      ofType(cartActions.addItem),
      concatMap(({ product }) =>
        cartService.addItem(product).pipe(
          map((items) => cartActions.addItemSuccess({ items })),
          catchError((error) =>
            of(cartActions.addItemFailure({ error: getErrorMessage(error) })),
          ),
        ),
      ),
    ),
  { functional: true },
);

export const updateItemQuantityInCartEffect = createEffect(
  (actions$ = inject(Actions), cartService = inject(CartService)) =>
    actions$.pipe(
      ofType(cartActions.updateItemQuantity),
      // debounceTime(500),
      concatMap(({ productId, quantity }) =>
        cartService.updateItemQuantity(productId, quantity).pipe(
          map((items) => cartActions.updateItemQuantitySuccess({ items })),
          catchError((error) =>
            of(
              cartActions.updateItemQuantityFailure({
                error: getErrorMessage(error),
              }),
            ),
          ),
        ),
      ),
    ),
  { functional: true },
);

export const removeItemFromCartEffect = createEffect(
  (actions$ = inject(Actions), cartService = inject(CartService)) =>
    actions$.pipe(
      ofType(cartActions.removeItem),
      // TODO: need to think about switch, concat, merge, maybe use debounce
      switchMap(({ productId }) =>
        cartService.removeItem(productId).pipe(
          map((items) => cartActions.removeItemSuccess({ items })),
          catchError((error) =>
            of(
              cartActions.removeItemFailure({
                error: getErrorMessage(error),
              }),
            ),
          ),
        ),
      ),
    ),
  { functional: true },
);

export const clearCartEffect = createEffect(
  (actions$ = inject(Actions), cartService = inject(CartService)) =>
    actions$.pipe(
      ofType(cartActions.clearCart),
      switchMap(() =>
        cartService.clear().pipe(
          map(() => cartActions.clearCartSuccess()),
          catchError((error) =>
            of(cartActions.clearCartFailure({ error: getErrorMessage(error) })),
          ),
        ),
      ),
    ),
  { functional: true },
);
