import { Routes } from '@angular/router';
import { authRoutes } from './routes/auth';
import { mainRoutes } from './routes/main';

export const routes: Routes = [
  { path: 'auth', children: [...authRoutes] },
  { path: '', children: [...mainRoutes] },
];
