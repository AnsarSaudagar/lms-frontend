import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Project } from '../../../models/project.model';
import { ProjectService } from '../../../services/project.service';

@Component({
  selector: 'app-project-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './project-header.html',
  styleUrl: './project-header.scss',
})
export class ProjectHeader {
  private projectService = inject(ProjectService);

  @Input() project: Project | null = null;

  categoryLabel(): string {
    return this.projectService.categories.find(c => c.id === this.project?.category)?.label ?? this.project?.category ?? '';
  }

  authorInitials(): string {
    const name = this.project?.authorName ?? '';
    return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  }
}
