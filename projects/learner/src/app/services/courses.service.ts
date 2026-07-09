import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private API_URL = '/courses';

  constructor(private http: HttpClient){
  }

  getAllCourses(){
    return this.http.get(this.API_URL);
  }

}
