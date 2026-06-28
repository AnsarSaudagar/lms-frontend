import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { layoutResolver } from './core/resolvers/layout.resolver';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/landing/landing').then(m => m.LandingComponent),
  },
  {
    path: 'auth',
    loadChildren: () => import('./routes/auth.routes').then(m => m.authRoutes),
  },
  {
    path: 'learner',
    resolve: { layout: layoutResolver },
    loadComponent: () => import('./layout/main/main').then(m => m.MainLayout),
    loadChildren: () => import('./routes/main.routes').then(m => m.routes),
    canMatch: [authGuard],
  },
  { path: '**', redirectTo: '' },
];
