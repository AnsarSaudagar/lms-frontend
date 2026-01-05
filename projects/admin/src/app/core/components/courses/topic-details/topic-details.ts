import { CommonModule } from '@angular/common';
import { Component, computed } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CourseService } from '../../../../services/course.service';
import {DurationPipe} from 'shared';
import { DialogModule } from 'primeng/dialog';
import { TextareaModule } from 'primeng/textarea';

@Component({
  selector: 'app-topic-details',
  imports: [CommonModule, ButtonModule, DurationPipe, DialogModule, TextareaModule],
  templateUrl: './topic-details.html',
  styleUrl: './topic-details.css',
})
export class TopicDetails {
  visible = false;
  topics = computed(() => {
    const course = this.courseService.selectedCourse();
    return course?.topics;
  });

  constructor(private courseService: CourseService){}
  
}
