import { Component, Input } from '@angular/core';
import { Project } from '../../../services/app-data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-card',
  imports: [CommonModule],
  templateUrl: './project-card.html',
  styleUrl: './project-card.scss',
})
export class ProjectCard {
  @Input() project : Project | null = null;
}
