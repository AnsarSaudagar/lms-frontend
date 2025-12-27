import { Routes } from '@angular/router';
import { authRoutes } from './routes/auth';

export const routes: Routes = [
    {path: 'auth', children: [
        ...authRoutes
    ]}
];
