import { Component } from '@angular/core';
import { Navbar } from '../../../core/components/courses/navbar/navbar';
import { PreviewCard } from '../../../core/components/courses/preview-card/preview-card';
import { DetailForm } from '../../../core/components/courses/detail-form/detail-form';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../../models/course.model';
import { CourseService } from '../../../services/course.service';
import { TopicDetails } from '../../../core/components/courses/topic-details/topic-details';
import { CourseDetails } from '../../../models/course-details.model';
import { CourseFormService } from '../../../services/course-form.service';

@Component({
  selector: 'app-course-form',
  imports: [Navbar, PreviewCard, DetailForm, TopicDetails],
  templateUrl: './course-form.html',
  styleUrl: './course-form.css',
})
export class CourseForm {
  courseData: Course | null = null;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private courseFormService: CourseFormService) { }

  ngOnInit() {
    const courseId: string | null = this.route.snapshot.paramMap.get('id');

    if (courseId) {
      this.courseService.getCourseById(courseId).subscribe({
        next: (response: CourseDetails) => {          
          this.courseData = response.course;
          this.courseService.selectedCourse.set(response.course);
          this.courseService.categories.set(response.categories);
          this.courseService.difficultyLevel.set(response.difficultyLevel);
          // Patching form values
          this.patchFormValues(this.courseData);
        }
      });
    } else {
      this.courseService.selectedCourse.set(null);
    }
  }

  private patchFormValues(course: Course) {
    this.courseFormService.form.patchValue({
      details: {
        title: course.title,
        description: course.description,
      },
      settings: {
        price: course.price,
        difficultyLevel: course.difficultyLevel,
        category: course.category
      }
    });
  }
}
