import { Routes } from "@angular/router";
import { Login } from "../pages/login/login";

export const authRoutes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('../pages/login/login').then(c => c.Login),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
]
