import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Course } from '../models/course.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TopicService {

  constructor(private http: HttpClient){}

  private getTopicApiUrl(courseId: string) {
    return environment.API_URL + '/courses/' + courseId + '/topics';
  }

  addTopicInCourse(courseId: string, payload: Partial<Course | Course[]>) {
    return this.http.post(this.getTopicApiUrl(courseId), payload);
  }
}
