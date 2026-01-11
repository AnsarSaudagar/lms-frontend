import { Component, computed } from '@angular/core';
import { CourseService } from '../../../../services/course.service';
import { DurationPipe } from 'shared';
import { CourseSettings } from './course-settings/course-settings';

@Component({
  selector: 'app-preview-card',
  imports: [DurationPipe, CourseSettings],
  templateUrl: './preview-card.html',
  styleUrl: './preview-card.css',
})
export class PreviewCard {
  courseData = computed(() => {
    return this.courseService.selectedCourse();
  });

  courseDuration = computed(() => {
    const course = this.courseService.selectedCourse();
    if (!course) return 0;

    let duration = 0;

    if(!course.topics) return 0;
    
    course.topics.forEach(topic => {
      duration += topic.duration;
    });

    return duration;
  });

  constructor(private courseService: CourseService) { }

}
