import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./modules/auth/pages/login-page/login-page'),
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
