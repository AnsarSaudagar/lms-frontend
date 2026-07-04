import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProjectServie } from '../../../services/project.service';
import { Project } from '../../../models/project.model';

@Component({
  selector: 'app-project-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './project-header.html',
  styleUrl: './project-header.scss',
})
export class ProjectHeader {
  private projectService = inject(ProjectServie);

  @Input() project: Project | null = null;

  categoryLabel(): string {
    return this.projectService.categories.find(c => c.id === this.project?.category)?.label ?? this.project?.category ?? '';
  }

  authorInitials(): string {
    const name = this.project?.authorName ?? '';
    return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  }
}
