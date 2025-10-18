import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    title: 'Login - Todo App',
    loadComponent: () =>
      import('./modules/auth/pages/login-page/login-page.component').then(
        (m) => m.default
      ),
  },
  {
    path: 'register',
    title: 'Register - Todo App',
    loadComponent: () =>
      import('./modules/auth/pages/register-page/register-page.component').then(
        (m) => m.default
      ),
  },
  {
    path: 'dashboard',
    title: 'Dashboard - Todo App',
    loadComponent: () =>
      import(
        './modules/dashboard/pages/dashboard-page/dashboard-page.component'
      ),
  },
];
