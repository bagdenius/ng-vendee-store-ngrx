import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { LucideLogOut, LucideShoppingCart, LucideUser } from '@lucide/angular';
import { Store } from '@ngrx/store';
import { cartFeature } from '../../../core/store/cart/cart.feature';
import { Button } from '../button/button';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  imports: [RouterLink, Button, LucideUser, LucideShoppingCart, LucideLogOut],
})
export class Header {
  private readonly store = inject(Store);

  protected readonly totalCartItemsQuantity = toSignal(
    this.store.select(cartFeature.selectTotalQuantity),
    { initialValue: 0 },
  );
}
