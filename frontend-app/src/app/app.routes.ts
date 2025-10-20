import { Routes } from '@angular/router';
import { authGuard, noAuthGuard } from './core/guards';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'login',
    title: 'Login - Todo App',
    canActivate: [noAuthGuard],
    loadComponent: () =>
      import('./modules/auth/pages/login-page/login-page.component').then(
        (m) => m.default
      ),
  },
  {
    path: 'register',
    title: 'Register - Todo App',
    canActivate: [noAuthGuard],
    loadComponent: () =>
      import('./modules/auth/pages/register-page/register-page.component').then(
        (m) => m.default
      ),
  },
  {
    path: 'dashboard',
    title: 'Dashboard - Todo App',
    canActivate: [authGuard],
    loadComponent: () =>
      import(
        './modules/dashboard/pages/dashboard-page/dashboard-page.component'
      ),
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
