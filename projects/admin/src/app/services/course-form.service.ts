import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseService } from './course.service';

@Injectable({
  providedIn: 'root',
})
export class CourseFormService {
  readonly form: FormGroup;

  constructor(private fb: FormBuilder, private courseService: CourseService) {
    this.form = this.fb.group({
      details: this.fb.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
      }),
      settings: this.fb.group({
        difficultyLevel: ['', Validators.required],
        category: ['', Validators.required],
        price: [0, Validators.required],
        // draft: [true, Validators.required]
      })
    })
  }

  onSubmitForm(course_id :string) {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { details, settings } = this.form.value;
    
    // For updating course
    this.courseService
      .updateCourse(course_id, {...details, ...settings})
      .subscribe({
        next: () => {
          // this.form.reset();
          this.courseService.selectedCourse.set(null);
        }
      });
    return;

  }
}
