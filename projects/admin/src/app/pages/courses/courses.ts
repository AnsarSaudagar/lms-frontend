import { Component } from '@angular/core';
import {  ButtonModule } from "primeng/button";
import { CourseList } from '../../core/components/courses/course-list/course-list';
import { NewFormModal } from '../../core/components/courses/new-form-modal/new-form-modal';

@Component({
  selector: 'app-courses',
  imports: [ButtonModule, CourseList, NewFormModal],
  templateUrl: './courses.html',
  styleUrl: './courses.css',
})
export class Courses  {


}
