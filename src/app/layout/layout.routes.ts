import { Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

export const layoutRoutes: Routes = [
 {
  path: '',
  component: LayoutComponent,
  children: [
   { path: '', redirectTo: 'home', pathMatch: 'full' },
   { path: 'home', loadComponent: () => import('./home/home.component').then((c) => c.HomeComponent) },
   { path: 'spinner', loadComponent: () => import('./spinner/spinner.component').then((c) => c.SpinnerComponent) },
   { path: 'games', loadComponent: () => import('./games/games.component').then((c) => c.GamesComponent) },
   { path: 'slam', loadComponent: () => import('./slam/slam.component').then((c) => c.SlamComponent) },
   { path: 'learning', loadComponent: () => import('./start-learning/start-learning.component').then((c) => c.StartLearningComponent) }
  ]
 }
];