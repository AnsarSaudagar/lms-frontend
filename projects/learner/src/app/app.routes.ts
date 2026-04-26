import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/landing/landing').then(m => m.LandingComponent),
  },
  {
    path: 'auth',
    loadComponent: () => import('./pages/auth/auth').then(m => m.AuthComponent),
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.DashboardComponent),
    canMatch: [authGuard],
  },
  {
    path: 'project/:id',
    loadComponent: () => import('./pages/project-detail/project-detail').then(m => m.ProjectDetailComponent),
    canMatch: [authGuard],
  },
  { path: '**', redirectTo: '' },
];
