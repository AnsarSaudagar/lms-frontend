import { Component, Input } from '@angular/core';
import { Navbar } from '../../../core/components/courses/navbar/navbar';
import { PreviewCard } from '../../../core/components/courses/preview-card/preview-card';
import { DetailForm } from '../../../core/components/courses/detail-form/detail-form';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../../models/course.model';
import { CourseService } from '../../../services/course.service';

@Component({
  selector: 'app-course-form',
  imports: [Navbar, PreviewCard, DetailForm],
  templateUrl: './course-form.html',
  styleUrl: './course-form.css',
})
export class CourseForm {
  courseData: Course | null = null;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService) { }

  ngOnInit() {
    const courseId: string | null = this.route.snapshot.paramMap.get('id');

    if (courseId) {
      this.courseService.getCourseById(courseId).subscribe({
        next: (course: Course) => {
          this.courseData = course;
          this.courseService.selectedCourse.set(course);
        }
      });
    } else {
      this.courseService.selectedCourse.set(null);
    }
  }
}
