import { Component, inject, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ProductCard } from '../../core/components/products/product-card/product-card';
import { productActions } from '../../core/store/product/product.actions';
import { productFeature } from '../../core/store/product/product.feature';

@Component({
  selector: 'products-page',
  templateUrl: './products.html',
  imports: [ProductCard, FormsModule],
})
export class ProductsPage implements OnInit {
  private readonly store = inject(Store);

  protected readonly products = toSignal(
    this.store.select(productFeature.selectFilteredProducts),
    { initialValue: [] },
  );
  protected readonly isLoading = toSignal(
    this.store.select(productFeature.selectIsLoading),
    { initialValue: false },
  );

  protected searchQuery = signal('');

  public ngOnInit(): void {
    const products = this.products();
    if (!products.length) this.store.dispatch(productActions.load());
  }

  protected onSearch() {
    this.store.dispatch(
      productActions.search({ searchQuery: this.searchQuery() }),
    );
  }
}
