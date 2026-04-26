import { Routes } from '@angular/router';
import { layoutResolver } from '../core/resolvers/layout.resolver';

export const mainRoutes: Routes = [
  {
    path: '',
    resolve: { layout: layoutResolver },
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('../pages/dashboard/dashboard').then(m => m.DashboardComponent),
      },
      {
        path: 'project/:id',
        loadComponent: () => import('../pages/project-detail/project-detail').then(m => m.ProjectDetailComponent),
      },
    ],
  },
];
