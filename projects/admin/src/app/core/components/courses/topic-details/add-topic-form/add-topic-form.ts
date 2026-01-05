import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TextareaModule } from 'primeng/textarea';

@Component({
  selector: 'app-add-topic-form',
  imports: [DialogModule, TextareaModule, ButtonModule],
  templateUrl: './add-topic-form.html',
  styleUrl: './add-topic-form.css',
})
export class AddTopicForm {
  visible = false;
}
