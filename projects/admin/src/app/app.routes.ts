import { Routes } from '@angular/router';
import { authRoutes } from './routes/auth';
import { mainRoutes } from './routes/main';
import { authGuard } from './core/guards/auth-guard';
import { layoutResolver, authLayoutResolver } from './core/resolvers/layout.resolver';
import { RouteWrapper } from './core/components/route-wrapper/route-wrapper';

export const routes: Routes = [
  {
    path: 'auth',
    component: RouteWrapper,
    canMatch: [authGuard],
    resolve: { layout: authLayoutResolver },
    children: [...authRoutes]
  },
  {
    path: '',
    component: RouteWrapper,
    canMatch: [authGuard],
    resolve: { layout: layoutResolver },
    children: [...mainRoutes]
  },
];
