import { Routes } from "@angular/router";
import { Home } from "../pages/home/home";
import { Test } from "../pages/test/test";

export const mainRoutes: Routes = [
    { path: '', component: Home },
    {
        path: 'test', component: Test,
        // data: { layout: 'test' }
    },
];