import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Badge, BadgeTone } from '../../core/components/ui/badge/badge';
import { ButtonDirective } from '../../core/components/ui/button/button';
import { EmptyState } from '../../core/components/ui/empty-state/empty-state';
import { ProjectsService } from '../../services/projects.service';
import { AdminProject } from '../../models/project.model';

const DIFFICULTY_TONE: Partial<Record<string, BadgeTone>> = {
  beginner: 'success',
  intermediate: 'warning',
  advanced: 'error',
};

@Component({
  selector: 'app-projects',
  imports: [Badge, ButtonDirective, EmptyState, RouterLink],
  templateUrl: './projects.html',
})
export class ProjectsComponent {
  private projectsService = inject(ProjectsService);

  projects = signal<AdminProject[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  protected readonly DIFFICULTY_TONE = DIFFICULTY_TONE;

  constructor() {
    this.projectsService.getAllProjects().subscribe({
      next: data => {
        this.projects.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load projects.');
        this.loading.set(false);
      },
    });
  }
}
