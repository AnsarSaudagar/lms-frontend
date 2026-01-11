import { Routes } from "@angular/router";
import { LAYOUT } from "../core/utils/constant";

export const courseRoutes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('../pages/courses/courses').then(m => m.Courses)
    },
    {
        path: 'create',
        loadComponent: () =>
            import('../pages/courses/course-form/course-form').then(m => m.CourseForm),
        data: { layout: LAYOUT.EMPTY }
    },
    {
        path: 'update/:id',
        loadComponent: () =>
            import('../pages/courses/course-form/course-form').then(m => m.CourseForm),
        data: { layout: LAYOUT.EMPTY }
    }
]