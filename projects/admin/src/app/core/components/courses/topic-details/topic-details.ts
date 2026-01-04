import { CommonModule } from '@angular/common';
import { Component, computed } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CourseService } from '../../../../services/course.service';

@Component({
  selector: 'app-topic-details',
  imports: [CommonModule, ButtonModule],
  templateUrl: './topic-details.html',
  styleUrl: './topic-details.css',
})
export class TopicDetails {
  
  topics = computed(() => {
    const course = this.courseService.selectedCourse();
    return course?.topics;
  });

  constructor(private courseService: CourseService){}
  
}
