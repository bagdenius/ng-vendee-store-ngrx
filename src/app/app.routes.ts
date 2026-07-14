import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import * as productEffects from './core/store/product/product.effects';
import { productFeature } from './core/store/product/product.feature';
import * as userEffects from './core/store/user/user.effects';
import { userFeature } from './core/store/user/user.feature';
import { cartFeature } from './core/store/cart/cart.feature';
import * as cartEffects from './core/store/cart/cart.effects';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./core/layouts/main-layout/main-layout').then(
        (m) => m.MainLayout,
      ),
    providers: [provideState(cartFeature), provideEffects(cartEffects)],
    // canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'products', pathMatch: 'full' },
      {
        path: 'products',
        loadComponent: () =>
          import('./pages/products/products').then((m) => m.ProductsPage),
        providers: [
          provideState(productFeature),
          provideEffects(productEffects),
        ],
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./pages/cart/cart').then((m) => m.CartPage),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./pages/profile/profile').then((m) => m.ProfilePage),
        providers: [provideState(userFeature), provideEffects(userEffects)],
      },
    ],
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then((m) => m.LoginPage),
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./pages/signup/signup').then((m) => m.SignupPage),
  },
];
