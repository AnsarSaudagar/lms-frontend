import { Component, inject, Input } from '@angular/core';
import { Project } from '../../../models/project.model';
import { ProjectProgress } from '../../../models/project-progress.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-progress-long-card',
  imports: [],
  templateUrl: './progress-long-card.html',
  styleUrl: './progress-long-card.scss',
})
export class ProgressLongCard {
  @Input() progress !: ProjectProgress | null;
  private router = inject(Router);

  resume(projectProgress: ProjectProgress) {
    this.router.navigate(['/learner/project', projectProgress.project.slug, 'learn', projectProgress.lastVisitedStep || 1]);
  }
}
