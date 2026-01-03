import { Component, OnInit } from '@angular/core';
import {  ButtonModule } from "primeng/button";
import { RouterLink } from "@angular/router";
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course.model';
import { CourseList } from '../../core/components/courses/course-list/course-list';

@Component({
  selector: 'app-courses',
  imports: [ButtonModule, RouterLink, CourseList],
  templateUrl: './courses.html',
  styleUrl: './courses.css',
})
export class Courses implements OnInit {

  constructor(private courseService: CourseService){}

  ngOnInit(): void {
    this.courseService.getCourses().subscribe({
      next: (courses : Course[]) => {
        console.log(courses);
      }
    })
  }

}
