import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    title: 'Login - Todo App',
    loadComponent: () =>
      import('./modules/auth/pages/login-page/login-page.component'),
  },
  {
    path: 'register',
    title: 'Register - Todo App',
    loadComponent: () =>
      import('./modules/auth/pages/register-page/register-page.component'),
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
