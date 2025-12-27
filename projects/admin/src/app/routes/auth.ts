import { Routes } from "@angular/router";
import { Auth } from "../layout/auth/auth";
import { Login } from "../pages/login/login";

export const authRoutes: Routes = [
  { path: 'login', component: Login },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
