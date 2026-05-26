import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: "login",
    loadChildren: () => import("./auth/auth.routes").then((c) => c.authRoutes),
  },
  {
    path: "home",
    loadComponent: () => import("./home/home.component").then((c) => c.HomeComponent),
  }
];
