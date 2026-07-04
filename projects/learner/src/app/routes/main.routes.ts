import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('../pages/dashboard/dashboard').then((m) => m.DashboardComponent),
  },
  {
    path: 'project/:slug',
    loadComponent: () => import('../pages/project-page/project-page').then((m) => m.ProjectPage),
  },
];
