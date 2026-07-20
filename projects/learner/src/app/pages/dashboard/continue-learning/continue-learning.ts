import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ProjectService } from '../../../services/project.service';
import { ProjectProgress } from '../../../models/project-progress.model';

@Component({
  selector: 'app-continue-learning',
  imports: [CommonModule, RouterModule],
  templateUrl: './continue-learning.html',
  styleUrl: './continue-learning.scss',
})
export class ContinueLearning implements OnInit {
  private projectService = inject(ProjectService);
  private router = inject(Router);

  inProgress = signal<ProjectProgress[]>([]);

  ngOnInit() {
    this.projectService.getAllProjectsProgress().subscribe({
      next: (progress) => {        
        this.inProgress.set((progress ?? []));
      },
      error: () => this.inProgress.set([]),
    });
  }

  resume(p: ProjectProgress) {
    this.router.navigate(['/learner/project', p.project.slug, 'learn', p.lastVisitedStep || 1]);
  }
}
