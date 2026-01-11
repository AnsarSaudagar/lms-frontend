import { Component, computed } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CourseService } from '../../../../services/course.service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-course-list',
  imports: [TableModule, RouterLink],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css',
})
export class CourseList {
  constructor(private courseService: CourseService) { }
   courses = computed(() => {
      return this.courseService.coursesData();
    });
  ngOnInit(): void {
    this.courseService.getCourses()
  }

  onClickDelete(id: string) {
    this.courseService.deleteCourse(id).subscribe({
      next: ()=> {
        this.courseService.getCourses();
      }
    });
  }
}
