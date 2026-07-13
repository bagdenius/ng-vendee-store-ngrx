import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ProductModel } from '../../models/product.model';

export const productActions = createActionGroup({
  source: 'Product',
  events: {
    Load: emptyProps(),
    'Load Success': props<{ products: ProductModel[] }>(),
    'Load Failure': props<{ error: string }>(),

    Search: props<{ searchQuery: string }>(),
  },
});
