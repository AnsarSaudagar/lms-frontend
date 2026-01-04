import { Routes } from "@angular/router";
import { Home } from "../pages/home/home";
import { Test } from "../pages/test/test";
import { Courses } from "../pages/courses/courses";
import { CourseForm } from "../pages/courses/course-form/course-form";
import { LAYOUT } from "../core/utils/constant";

export const mainRoutes: Routes = [
    { path: '', component: Home },
    {
        path: 'courses',
        children: [
            { path: '', component: Courses },
            {
                path: 'create',
                component: CourseForm,
                data: { layout: LAYOUT.EMPTY }
            },
            {
                path: 'update/:id',
                component: CourseForm,
                data: { layout: LAYOUT.EMPTY }
            }
        ]
    },
    { path: 'test', component: Test },
];