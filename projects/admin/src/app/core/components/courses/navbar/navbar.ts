import { Component, effect } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CourseService } from '../../../../services/course.service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-navbar',
  imports: [ButtonModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

  title : string = 'Create New Course';

  constructor(private courseService: CourseService){
    effect(() => {
      const signalCourseData = this.courseService.selectedCourse();

      if (!signalCourseData) return;
      this.title = signalCourseData.title;
    });
  }

  onSaveCourse() {
    this.courseService.mainFormSubmit$.next();
  }
}
