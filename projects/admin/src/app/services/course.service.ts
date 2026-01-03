import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { Course } from '../models/course.model';

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

  constructor(private http: HttpClient) { }

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.COURSE_API_URL);
  }

  addCourse(payload: NewCoursePayload) {
    return this.http.post<Course>(this.COURSE_API_URL, payload);
  }

  deleteCourse(courseId: string){
    return this.http.delete(this.COURSE_API_URL + '/' + courseId);
  }
}
