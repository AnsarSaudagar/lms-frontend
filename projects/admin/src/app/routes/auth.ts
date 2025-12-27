import { Routes } from "@angular/router";
import { Auth } from "../layout/auth/auth";

export const authRoutes: Routes = [
  { path: 'login', component: Auth },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
