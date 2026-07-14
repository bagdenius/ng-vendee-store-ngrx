import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { CartItemModel } from '../../models/cart-item.model';
import { cartActions } from './cart.actions';

export interface CartState {
  items: CartItemModel[];
  isLoading: boolean;
  error: string | null;
}

export const initialCartState: CartState = {
  items: [],
  isLoading: false,
  error: null,
};

// Most of the reducers can be collapsed
export const cartFeature = createFeature({
  name: 'cart',
  reducer: createReducer(
    initialCartState,

    // Load cart items
    on(cartActions.load, (state) => ({
      ...state,
      isLoading: true,
      error: null,
    })),
    on(cartActions.loadSuccess, (state, { items }) => ({
      ...state,
      items,
      isLoading: false,
      error: null,
    })),
    on(cartActions.loadFailure, (state, { error }) => ({
      ...state,
      isLoading: false,
      error,
    })),

    // Add item to cart
    on(cartActions.addItem, (state) => ({
      ...state,
      isLoading: true,
      error: null,
    })),
    on(cartActions.addItemSuccess, (state, { items }) => ({
      ...state,
      items,
      isLoading: false,
      error: null,
    })),
    on(cartActions.addItemFailure, (state, { error }) => ({
      ...state,
      isLoading: false,
      error,
    })),

    // Update item quantity in cart
    on(cartActions.updateItemQuantity, (state) => ({
      ...state,
      isLoading: true,
      error: null,
    })),
    on(cartActions.updateItemQuantitySuccess, (state, { items }) => ({
      ...state,
      items,
      isLoading: false,
      error: null,
    })),
    on(cartActions.updateItemQuantityFailure, (state, { error }) => ({
      ...state,
      isLoading: false,
      error,
    })),

    // Remove item from cart
    on(cartActions.removeItem, (state) => ({
      ...state,
      isLoading: true,
      error: null,
    })),
    on(cartActions.removeItemSuccess, (state, { items }) => ({
      ...state,
      items,
      isLoading: false,
      error: null,
    })),
    on(cartActions.removeItemFailure, (state, { error }) => ({
      ...state,
      isLoading: false,
      error,
    })),

    // Clear cart
    on(cartActions.clearCart, (state) => ({
      ...state,
      isLoading: true,
      error: null,
    })),
    on(cartActions.clearCartSuccess, (state) => ({
      ...state,
      items: [],
      isLoading: false,
      error: null,
    })),
    on(cartActions.clearCartFailure, (state, { error }) => ({
      ...state,
      isLoading: false,
      error,
    })),
  ),

  extraSelectors: ({ selectItems }) => ({
    selectItemsQuantity: createSelector(selectItems, (items) => items.length),

    selectTotalQuantity: createSelector(selectItems, (items) =>
      items.reduce((total, item) => total + item.quantity, 0),
    ),

    selectTotalPrice: createSelector(selectItems, (items) =>
      items.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0,
      ),
    ),
  }),
});
