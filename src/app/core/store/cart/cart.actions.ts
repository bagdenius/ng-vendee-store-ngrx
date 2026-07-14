import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CartItemModel } from '../../models/cart-item.model';
import { ProductModel } from '../../models/product.model';

export const cartActions = createActionGroup({
  source: 'Cart',
  events: {
    Load: emptyProps(),
    'Load Success': props<{ items: CartItemModel[] }>(),
    'Load Failure': props<{ error: string }>(),

    'Add Item': props<{ product: ProductModel }>(),
    'Add Item Success': props<{ items: CartItemModel[] }>(),
    'Add Item Failure': props<{ error: string }>(),

    'Update Item Quantity': props<{
      productId: number;
      quantity: number;
    }>(),
    'Update Item Quantity Success': props<{ items: CartItemModel[] }>(),
    'Update Item Quantity Failure': props<{ error: string }>(),

    'Remove Item': props<{ productId: number }>(),
    'Remove Item Success': props<{ items: CartItemModel[] }>(),
    'Remove Item Failure': props<{ error: string }>(),

    'Clear Cart': emptyProps(),
    'Clear Cart Success': emptyProps(),
    'Clear Cart Failure': props<{ error: string }>(),
  },
});
