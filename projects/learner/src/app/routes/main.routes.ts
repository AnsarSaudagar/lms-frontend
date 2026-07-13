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
  {
    path: 'project/:slug/learn',
    loadComponent: () => import('../pages/project-detail/project-detail').then((m) => m.ProjectDetailComponent),
  },
  {
    path: 'cart',
    loadComponent: () => import('../pages/cart/cart').then(m => m.Cart),
  }
];
