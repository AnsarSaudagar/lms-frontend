import { Routes } from '@angular/router';
import { authRoutes } from './routes/auth';
import { mainRoutes } from './routes/main';
import { authGuard } from './core/guards/auth-guard';
import { layoutResolver } from './core/resolvers/layout.resolver';

export const routes: Routes = [
  {
    path: 'auth',
    children: [...authRoutes],
    canMatch: [authGuard],
  },
  {
    path: '',
    children: [...mainRoutes],
    canMatch: [authGuard],
    resolve: { layout: layoutResolver }
  },
];
