import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TextareaModule } from 'primeng/textarea';
import { TopicService } from '../../../../../services/topic.service';
import { CourseService } from '../../../../../services/course.service';

@Component({
  selector: 'app-add-topic-form',
  imports: [DialogModule, TextareaModule, ButtonModule, FormsModule],
  templateUrl: './add-topic-form.html',
  styleUrl: './add-topic-form.css',
})
export class AddTopicForm {
  visible : boolean = false;

  topics: string = "";

  constructor(private topicService: TopicService, private courseService: CourseService){}

  onClickFormat() {
    try {
      const parsed = JSON.parse(this.topics);
      this.topics = JSON.stringify(parsed, null, 2);
    } catch (error) {
      alert('Invalid JSON')
    }
  }
  

  onClickTopicSave() {
    try {
      const currCourse = this.courseService.selectedCourse();
      if(!currCourse) return;
      
      const topicsObj = JSON.parse(this.topics);
      
      const topicPayload = Array.isArray(topicsObj) ? topicsObj : [topicsObj];
           
      this.topicService.addTopicInCourse(currCourse._id, topicPayload).subscribe({
        complete: () => this.visible = false
      });
    } catch (error) {      
      alert('Invalid JSON')
    }

  }
}
