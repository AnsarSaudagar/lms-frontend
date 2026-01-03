import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CourseService } from '../../../../services/course.service';
import { Course } from '../../../../models/course.model';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-course-list',
  imports: [TableModule, AsyncPipe],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css',
})
export class CourseList {
  courses$ !: Observable<Course[]>;
  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.courses$ = this.courseService.getCourses();
  }
}
