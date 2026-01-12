import { Routes } from "@angular/router";
import { Home } from "../pages/home/home";
import { Test } from "../pages/test/test";

export const mainRoutes: Routes = [
    { path: '', component: Home },
    {
        path: 'courses',
        loadChildren: () => 
            import('./course').then(m => m.courseRoutes)
    },
    {
        path: 'error-logger',
        loadComponent: () => 
            import('../pages/error-logger/error-logger').then(m => m.ErrorLogger)
    },
    { path: 'test', component: Test },
];