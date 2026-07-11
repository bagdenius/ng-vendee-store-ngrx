import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./core/layouts/main-layout/main-layout').then(
        (m) => m.MainLayout,
      ),
    // canActivate: [authGuard],
    children: [
      {
        path: 'products',
        loadComponent: () =>
          import('./pages/products/products').then((m) => m.ProductsPage),
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
