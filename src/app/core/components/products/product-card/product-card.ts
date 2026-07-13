import { Component, input, output } from '@angular/core';
import { LucideStar } from '@lucide/angular';
import { Button } from '../../../../shared/components/button/button';
import { ProductModel } from '../../../models/product.model';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.html',
  imports: [LucideStar, Button, CurrencyPipe],
  host: {
    class:
      'block bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden',
  },
})
export class ProductCard {
  // protected readonly apiUrl = environment.apiUrl;
  protected readonly addToCard = output<ProductModel>();

  public readonly product = input.required<ProductModel>();
}
