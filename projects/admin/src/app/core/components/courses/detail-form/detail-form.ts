import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EditorModule } from 'primeng/editor';
import { Course } from '../../../../models/course.model';
import { CommonModule } from '@angular/common';
import { CourseFormService } from '../../../../services/course-form.service';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { CourseService } from '../../../../services/course.service';

@Component({
  selector: 'app-detail-form',
  imports: [EditorModule, ReactiveFormsModule, CommonModule, FileUploadModule, ButtonModule],
  templateUrl: './detail-form.html',
  styleUrl: './detail-form.css',
})
export class DetailForm {
  courseForm: FormGroup;
  courseData: Course | null = null;

  constructor(private courseFormService: CourseFormService, private courseService: CourseService) {
    this.courseForm = this.courseFormService.form;
  }

  onUpload(event: any) {
    const file: File = event.files
      ? event.files[0] 
      : (event.target as HTMLInputElement).files![0]; 

    const formData = new FormData();
    formData.append('image', file); 
    
    const id = this.courseService.selectedCourse()?._id;
    if(id){
      this.courseService.uploadCourseImage(formData, id).subscribe();
    }

  }
}
