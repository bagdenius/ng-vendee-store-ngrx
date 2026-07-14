import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../../../shared/components/header/header';
import { Footer } from '../../../shared/components/footer/footer';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { cartFeature } from '../../store/cart/cart.feature';
import { cartActions } from '../../store/cart/cart.actions';

@Component({
  selector: 'main-layout',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './main-layout.html',
  host: {
    class: 'min-h-screen flex flex-col',
  },
})
export class MainLayout implements OnInit {
  private readonly store = inject(Store);

  protected readonly items = toSignal(
    this.store.select(cartFeature.selectItems),
    { initialValue: [] },
  );

  public ngOnInit(): void {
    const items = this.items();
    if (!items.length) this.store.dispatch(cartActions.load());
  }
}
