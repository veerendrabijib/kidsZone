import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full',
  },
  {
    path: 'splash',
    loadComponent: () => import('./splash/splash.component').then(m => m.SplashComponent)
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
