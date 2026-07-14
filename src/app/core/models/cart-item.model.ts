import { ProductModel } from './product.model';

export interface CartItemModel {
  product: ProductModel;
  quantity: number;
}
