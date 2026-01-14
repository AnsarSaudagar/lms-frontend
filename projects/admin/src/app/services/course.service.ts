import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { Course } from '../models/course.model';
import { CourseDetails } from '../models/course-details.model';
import { Category } from '../models/category.model';

interface NewCoursePayload {
  title: string;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class CourseService {

  private COURSE_API_URL = environment.API_URL + '/courses';
  
  mainFormSubmit$ = new Subject<void>();
  selectedCourse = signal<Course | null>(null);
  coursesData = signal<Course[]>([]);
  difficultyLevel = signal<any>([]);
  categories = signal<Category[]>([]);

  constructor(private http: HttpClient) { }

  getCourses(): void {
    this.http.get<Course[]>(this.COURSE_API_URL).subscribe({
      next: (courses: Course[]) => {
        this.coursesData.set(courses);
      }
    });
  }

  getCourseById(courseId: string) {
    return this.http.get<CourseDetails>(this.COURSE_API_URL + '/' + courseId)
  }

  addCourse(payload: NewCoursePayload) {
    return this.http.post<Course>(this.COURSE_API_URL, payload);
  }

  updateCourse(id: string, payload: Partial<Course>){
    return this.http.put<Course>(this.COURSE_API_URL + "/" + id, payload);
  }

  deleteCourse(courseId: string) {
    return this.http.delete(this.COURSE_API_URL + '/' + courseId);
  }

  uploadCourseImage(formData : FormData, id :string){
    return this.http.post(this.COURSE_API_URL + '/image/' + id, formData);
  }
}