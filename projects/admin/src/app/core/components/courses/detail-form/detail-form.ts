import { Component, effect } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EditorModule } from 'primeng/editor';
import { CourseService } from '../../../../services/course.service';

@Component({
  selector: 'app-detail-form',
  imports: [EditorModule, ReactiveFormsModule],
  templateUrl: './detail-form.html',
  styleUrl: './detail-form.css',
})
export class DetailForm {
  courseForm: FormGroup;

  constructor(private courseService: CourseService) {
    this.courseForm = new FormGroup({
      'title': new FormControl('', [Validators.required]),
      'description': new FormControl('', [Validators.required])
    });

    // When form submit is clicked this will be trigger
    courseService.mainFormSubmit$.subscribe({
      next: () => {
        this.onSubmit();
      }
    });
  }

  onSubmit() {
    if (this.courseForm.invalid) {
      this.courseForm.markAllAsTouched();
      return;
    }

    const { title, description } = this.courseForm.value;

    this.courseService.addCourse({ title, description }).subscribe();

    this.courseForm.reset();
  }
}
