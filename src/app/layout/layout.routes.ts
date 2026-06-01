import { Routes } from '@angular/router'
import { LayoutComponent } from './layout.component'

export const layoutRoutes: Routes = [
 {
  path: '',
  component: LayoutComponent,
  children: [
   { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
   {
    path: 'home',
    loadComponent: () => import('./home/home.component').then((c) => c.HomeComponent)
   }
]
 }]