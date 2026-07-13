import { createFeature, createReducer, on } from '@ngrx/store';
import { ProductModel } from '../../../core/models/product.model';
import { productActions } from './product.actions';

export interface ProductState {
  products: ProductModel[];
  filteredProducts: ProductModel[];
  searchQuery: string | null;
  isLoading: boolean;
  error: string | null;
}

export const initialProductState: ProductState = {
  products: [],
  filteredProducts: [],
  searchQuery: null,
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
      filteredProducts: products,
      isLoading: false,
      error: null,
    })),
    on(productActions.loadFailure, (state, { error }) => ({
      ...state,
      isLoading: false,
      error,
    })),

    on(productActions.search, (state, { searchQuery }) => {
      const filteredProducts = state.products.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      return {
        ...state,
        searchQuery,
        filteredProducts,
      };
    }),
  ),
});
