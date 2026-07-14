import { Injectable } from '@angular/core';
import { delay, Observable, of, switchMap, throwError, timer } from 'rxjs';
import { CartItemModel } from '../models/cart-item.model';
import { ProductModel } from '../models/product.model';

// Test service with local storage simulating real api
@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly localStorageKey = 'ngrx_storage:cart';

  private getFromLocalStore(): CartItemModel[] {
    try {
      const jsonItems = localStorage.getItem(this.localStorageKey);
      return jsonItems ? JSON.parse(jsonItems) : [];
    } catch {
      return [];
    }
  }

  private saveToLocalStore(items: CartItemModel[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(items));
  }

  private simulateApi<T>(data: T): Observable<T> {
    return of(data).pipe(delay(500));
  }

  private simulateError(error: Error): Observable<never> {
    return timer(500).pipe(switchMap(() => throwError(() => error)));
  }

  public get(): Observable<CartItemModel[]> {
    return this.simulateApi(this.getFromLocalStore());
  }

  public addItem(product: ProductModel): Observable<CartItemModel[]> {
    const items = this.getFromLocalStore();
    const existingItem = items.find((item) => item.product.id === product.id);
    if (existingItem) ++existingItem.quantity;
    else items.push({ product, quantity: 1 });
    this.saveToLocalStore(items);
    return this.simulateApi(items);
  }

  public updateItemQuantity(
    productId: number,
    quantity: number,
  ): Observable<CartItemModel[]> {
    const items = this.getFromLocalStore();
    if (quantity < 1) return this.removeItem(productId);
    const existingItem = items.find((item) => item.product.id === productId);
    if (!existingItem) return this.simulateError(new Error('Item not found'));
    existingItem.quantity = quantity;
    this.saveToLocalStore(items);
    return this.simulateApi(items);
  }

  public removeItem(productId: number): Observable<CartItemModel[]> {
    const items = this.getFromLocalStore();
    const exists = items.some((i) => i.product.id === productId);
    if (!exists) return this.simulateError(new Error('Item not found'));
    const filteredItems = items.filter((item) => item.product.id !== productId);
    this.saveToLocalStore(filteredItems);
    return this.simulateApi(filteredItems);
  }

  public clear(): Observable<CartItemModel[]> {
    const items: CartItemModel[] = [];
    this.saveToLocalStore(items);
    return this.simulateApi(items);
  }
}
