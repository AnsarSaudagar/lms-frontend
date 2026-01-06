import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CourseService } from '../../../../services/course.service';
import { DialogModule } from 'primeng/dialog';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { EditorModule } from 'primeng/editor';

@Component({
  selector: 'app-new-form-modal',
  imports: [CommonModule, ReactiveFormsModule, DialogModule, RouterModule, ButtonModule, EditorModule],
  templateUrl: './new-form-modal.html',
  styleUrl: './new-form-modal.css',
})
export class NewFormModal {
  courseForm!: FormGroup;
  visible = false;

  constructor(private courseService: CourseService){
    this.courseForm = new FormGroup({
      'title': new FormControl('', [Validators.required]),
      'description': new FormControl('', [Validators.required])
    });
  }

  onSubmit() {
    
    if (this.courseForm.invalid) {
      this.courseForm.markAllAsTouched();
      return;
    }

    const { title, description } = this.courseForm.value;

    // For creating new course
    this.courseService
      .addCourse({ title, description })
      .subscribe(() => {
        this.courseForm.reset();
      });
  }
}
