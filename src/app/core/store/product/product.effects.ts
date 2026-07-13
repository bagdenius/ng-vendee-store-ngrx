import { Actions, createEffect, ofType } from '@ngrx/effects';
import { productActions } from './product.actions';
import { inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { catchError, map, of, switchMap } from 'rxjs';
import { getErrorMessage } from '../../../shared/utils/get-error-message.util';

export const productLoadEffect = createEffect(
  (actions$ = inject(Actions), productService = inject(ProductService)) =>
    actions$.pipe(
      ofType(productActions.load),
      switchMap(() =>
        productService.getAll().pipe(
          map((products) => productActions.loadSuccess({ products })),
          catchError((error) =>
            of(productActions.loadFailure({ error: getErrorMessage(error) })),
          ),
        ),
      ),
    ),
  { functional: true },
);
