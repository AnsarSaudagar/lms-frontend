import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-topic-details',
  imports: [CommonModule, ButtonModule],
  templateUrl: './topic-details.html',
  styleUrl: './topic-details.css',
})
export class TopicDetails {

}
