import { Routes } from '@angular/router';
import { AuthComponent } from './auth.component';

export const authRoutes: Routes = [
 {
  path: '',
  component: AuthComponent,
  children: [
   {
    path: '',
    loadComponent: () => import('./login/login.component').then((c) => c.LoginComponent),
   },
   {
    path: 'signup',
    loadComponent: () => import('./signup/signup.component').then((c) => c.SignupComponent),
   },
  ],
 },
];