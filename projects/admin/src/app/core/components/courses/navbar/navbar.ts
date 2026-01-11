import { Component, computed, effect } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CourseService } from '../../../../services/course.service';
import { ActivatedRoute, RouterLink } from "@angular/router";
import { CourseFormService } from '../../../../services/course-form.service';

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
  
  constructor(
    private courseService: CourseService,
    private courseFormService: CourseFormService,
    private route: ActivatedRoute) { }

  onSaveCourse() {
    this.route.params.subscribe({
      next: (params : any) => {
        const courseId = params.id;
        this.courseFormService.onSubmitForm(courseId);
      }
    })
  }
}
