import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TextareaModule } from 'primeng/textarea';

@Component({
  selector: 'app-add-topic-form',
  imports: [DialogModule, TextareaModule, ButtonModule, FormsModule],
  templateUrl: './add-topic-form.html',
  styleUrl: './add-topic-form.css',
})
export class AddTopicForm {
  visible = false;

  topics: any = "";

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
      const topicsObj = JSON.parse(this.topics);
    } catch (error) {
      alert('Invalid JSON')
    }

  }
}
