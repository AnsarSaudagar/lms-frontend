import { Component } from '@angular/core';
import { Navbar } from '../../../core/components/courses/navbar/navbar';
import { PreviewCard } from '../../../core/components/courses/preview-card/preview-card';
import { DetailForm } from '../../../core/components/courses/detail-form/detail-form';

@Component({
  selector: 'app-course-form',
  imports: [Navbar, PreviewCard, DetailForm],
  templateUrl: './course-form.html',
  styleUrl: './course-form.css',
})
export class CourseForm {

}
