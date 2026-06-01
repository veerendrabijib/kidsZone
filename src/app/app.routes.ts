import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.routes').then((c) => c.authRoutes),
  },
  {
    path: 'layout',
    loadChildren: () => import('./layout/layout.routes').then((c) => c.layoutRoutes),
  },
  {
    path: '**',
    redirectTo: 'login',
  }
];
