import { Category } from "./category.model";
import { Course } from "./course.model";

export interface CourseDetails{
    course: Course;
    categories: Category[];
    difficultyLevel : any;
}