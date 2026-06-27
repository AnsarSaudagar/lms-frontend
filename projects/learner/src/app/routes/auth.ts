import { Routes } from '@angular/router';
import { authLayoutResolver } from '../core/resolvers/layout.resolver';

export const authRoutes: Routes = [
  {
    path: '',
    resolve: { layout: authLayoutResolver },
    loadComponent: () => import('../pages/auth/auth').then(m => m.AuthComponent),
    children:[
      {
        path: 'register',
        loadComponent: () => import('../pages/auth/register/register').then(m => m.Register)
      },
      {
        path: 'login',
        loadComponent: () => import('../pages/auth/login/login').then(m => m.Login)
      },
      {
        path: 'verify-otp',
        loadComponent: () => import('../pages/auth/verify-register-otp/verify-register-otp').then(m => m.VerifyRegisterOtp)
      },
      {
        path: 'forgot-password',
        loadComponent: () => import('../pages/auth/forgot-password/forgot-password').then(m => m.ForgotPassword)
      },
      {
        path: 'reset-password',
        loadComponent: () => import('../pages/auth/reset-password/reset-password').then(m => m.ResetPassword)
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
    ],
  },
];
