import { Component, OnInit } from '@angular/core';
import {  ButtonModule } from "primeng/button";
import { RouterLink } from "@angular/router";
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-courses',
  imports: [ButtonModule, RouterLink],
  templateUrl: './courses.html',
  styleUrl: './courses.css',
})
export class Courses implements OnInit {

  constructor(private courseService: CourseService){}

  ngOnInit(): void {
    this.courseService.getCourses().subscribe({
      next: (courses) => {
        console.log(courses);
      }
    })
  }

}
