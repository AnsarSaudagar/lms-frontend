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
    { path: 'test', component: Test },
];