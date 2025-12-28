import { Routes } from "@angular/router";
import { Main } from "../layout/main/main";
import { Home } from "../pages/home/home";
import { Test } from "../pages/test/test";
import { testLayoutResolver } from "../core/resolvers/layout.resolver";

export const mainRoutes: Routes = [
    {path: '', component: Home},
    {path: 'test', component: Test, resolve: { layout: testLayoutResolver }},
];