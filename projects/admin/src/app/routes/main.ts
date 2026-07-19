import { Routes } from '@angular/router';

export const mainRoutes: Routes = [
  {
    path: 'dashboard',
    data: { title: 'Dashboard' },
    loadComponent: () => import('../pages/dashboard/dashboard').then(m => m.DashboardComponent),
  },
  {
    path: 'learners',
    data: { title: 'Learners' },
    loadComponent: () => import('../pages/learners/learners').then(m => m.LearnersComponent),
  },
  {
    path: 'projects/create',
    data: { title: 'Create Project' },
    loadComponent: () => import('../pages/projects/create/create-project').then(m => m.CreateProjectComponent),
  },
  {
    path: 'projects/history',
    data: { title: 'Generation History' },
    loadComponent: () =>
      import('../pages/projects/history/generation-history').then(m => m.GenerationHistoryComponent),
  },
  {
    path: 'projects',
    data: { title: 'Projects' },
    loadComponent: () => import('../pages/projects/projects').then(m => m.ProjectsComponent),
  },
  {
    path: 'content',
    data: { title: 'Content' },
    loadComponent: () => import('../pages/content/content').then(m => m.ContentComponent),
  },
  {
    path: 'analytics',
    data: { title: 'Analytics' },
    loadComponent: () => import('../pages/analytics/analytics').then(m => m.AnalyticsComponent),
  },
  {
    path: 'notifications',
    data: { title: 'Notifications' },
    loadComponent: () => import('../pages/notifications/notifications').then(m => m.NotificationsComponent),
  },
  {
    path: 'system-logs',
    data: { title: 'System Logs' },
    loadComponent: () => import('../pages/system-logs/system-logs').then(m => m.SystemLogsComponent),
  },
  {
    path: 'settings',
    data: { title: 'Settings' },
    loadComponent: () => import('../pages/settings/settings').then(m => m.SettingsComponent),
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];
