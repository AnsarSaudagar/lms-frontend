import { Routes } from "@angular/router";
import { Home } from "../pages/home/home";
import { Test } from "../pages/test/test";
import { Courses } from "../pages/courses/courses";
import { CourseForm } from "../pages/courses/course-form/course-form";
import { LAYOUT } from "../core/utils/constant";
import { courseRoutes } from "./course";

export const mainRoutes: Routes = [
    { path: '', component: Home },
    {
        path: 'courses',
        loadChildren: () => 
            import('./course').then(m => m.courseRoutes)
    },
    { path: 'test', component: Test },
];