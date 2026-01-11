import { Component, computed, effect } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EditorModule } from 'primeng/editor';
import { CourseService } from '../../../../services/course.service';
import { Course } from '../../../../models/course.model';
import { CommonModule } from '@angular/common';
import { CourseFormService } from '../../../../services/course-form.service';

@Component({
  selector: 'app-detail-form',
  imports: [EditorModule, ReactiveFormsModule, CommonModule],
  templateUrl: './detail-form.html',
  styleUrl: './detail-form.css',
})
export class DetailForm {
  courseForm: FormGroup;
  courseData: Course | null = null;

  constructor(private courseFormService: CourseFormService) {
    this.courseForm = this.courseFormService.form;
  }
}
