import { Routes } from '@angular/router';
import { authLayoutResolver } from '../core/resolvers/layout.resolver';

export const authRoutes: Routes = [
  {
    path: '',
    resolve: { layout: authLayoutResolver },
    loadComponent: () => import('../pages/auth/auth').then(m => m.AuthComponent),
  },
];
