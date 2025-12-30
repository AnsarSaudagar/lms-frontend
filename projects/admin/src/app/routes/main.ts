import { Routes } from "@angular/router";
import { Home } from "../pages/home/home";
import { Test } from "../pages/test/test";
import { Courses } from "../pages/courses/courses";
import { CourseForm } from "../pages/courses/course-form/course-form";

export const mainRoutes: Routes = [
    { path: '', component: Home },
    {
        path: 'courses',
        children: [
            { path: '', component: Courses },
            { path: 'create', component: CourseForm } 
        ]
    },
    { path: 'test', component: Test },
];