import { Routes } from '@angular/router';
import { authRoutes } from './routes/auth';
import { mainRoutes } from './routes/main';
import { authGuard } from './core/guards/auth-guard';
import { layoutResolver, authLayoutResolver } from './core/resolvers/layout.resolver';
import { RouteWrapper } from './core/components/route-wrapper/route-wrapper';
import { LAYOUT } from './core/utils/constant';

export const routes: Routes = [
  {
    path: 'auth',
    component: RouteWrapper,
    canMatch: [authGuard],
    children: [...authRoutes],
    data: { layout: LAYOUT.AUTH },
  },
  {
    path: '',
    component: RouteWrapper,
    canMatch: [authGuard],
    children: [...mainRoutes],
    data: { layout: LAYOUT.MAIN },
  },
];
