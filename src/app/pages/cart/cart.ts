import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import {
  LucideMinus,
  LucidePlus,
  LucideShoppingBag,
  LucideTrash2,
} from '@lucide/angular';
import { Store } from '@ngrx/store';
import { cartActions } from '../../core/store/cart/cart.actions';
import { cartFeature } from '../../core/store/cart/cart.feature';
import { Button } from '../../shared/components/button/button';

@Component({
  selector: 'cart-page',
  templateUrl: './cart.html',
  imports: [
    LucideShoppingBag,
    LucideTrash2,
    LucidePlus,
    LucideMinus,
    RouterLink,
    Button,
    CurrencyPipe,
  ],
})
export class CartPage {
  private readonly store = inject(Store);

  protected readonly items = toSignal(
    this.store.select(cartFeature.selectItems),
    { initialValue: [] },
  );
  protected readonly isLoading = toSignal(
    this.store.select(cartFeature.selectIsLoading),
    { initialValue: false },
  );
  protected readonly totalItemsQuantity = toSignal(
    this.store.select(cartFeature.selectTotalQuantity),
    { initialValue: 0 },
  );
  protected readonly totalPrice = toSignal(
    this.store.select(cartFeature.selectTotalPrice),
    { initialValue: 0 },
  );

  protected onRemove(productId: number) {
    this.store.dispatch(cartActions.removeItem({ productId }));
  }

  protected onUpdateQuantity(productId: number, quantity: number) {
    this.store.dispatch(
      cartActions.updateItemQuantity({ productId, quantity }),
    );
  }

  protected onClearCart() {
    const items = this.items();
    if (items.length) this.store.dispatch(cartActions.clearCart());
  }
}
