import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';

interface NewCoursePayload{
  title :string;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class CourseService {

    private COURSE_API_URL = environment.API_URL + '/courses';

    mainFormSubmit$ = new Subject<void>();

    constructor(private http: HttpClient){}

    addCourse(payload: NewCoursePayload){
        return this.http.post(this.COURSE_API_URL, payload);
    }
}
