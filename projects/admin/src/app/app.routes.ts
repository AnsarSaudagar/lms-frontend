import { Routes } from '@angular/router';
import { authRoutes } from './routes/auth';
import { mainRoutes } from './routes/main';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  { path: 'auth', children: [...authRoutes] },
  { path: '', children: [...mainRoutes] , canActivate: [authGuard]},
];
