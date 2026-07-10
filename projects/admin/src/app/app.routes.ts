import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadComponent: () => import('./layout/auth/auth').then(m => m.AuthLayout),
    loadChildren: () => import('./routes/auth').then(m => m.authRoutes),
    canMatch: [authGuard],
  },
  {
    path: '',
    loadComponent: () => import('./layout/main/main').then(m => m.MainLayout),
    loadChildren: () => import('./routes/main').then(m => m.mainRoutes),
    canMatch: [authGuard],
  },
  { path: '**', redirectTo: '' },
];
