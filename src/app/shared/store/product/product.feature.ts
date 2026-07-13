import { createFeature, createReducer, on } from '@ngrx/store';
import { ProductModel } from '../../../core/models/product.model';
import { productActions } from './product.actions';

export interface ProductState {
  products: ProductModel[];
  isLoading: boolean;
  error: string | null;
}

export const initialProductState: ProductState = {
  products: [],
  isLoading: false,
  error: null,
};

export const productFeature = createFeature({
  name: 'product',
  reducer: createReducer(
    initialProductState,
    on(productActions.load, (state) => ({
      ...state,
      isLoading: true,
      error: null,
    })),
    on(productActions.loadSuccess, (state, { products }) => ({
      ...state,
      products,
      isLoading: false,
      error: null,
    })),
    on(productActions.loadFailure, (state, { error }) => ({
      ...state,
      isLoading: false,
      error,
    })),
  ),
});
