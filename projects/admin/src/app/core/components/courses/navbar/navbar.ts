import { Component, computed, effect } from '@angular/core';
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

  title = computed(() => {
    const course = this.courseService.selectedCourse();
    return course ? course.title : 'Create New Course';
  });
  constructor(private courseService: CourseService) {}

  onSaveCourse() {
    this.courseService.mainFormSubmit$.next();
  }
}
