import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ProjectService } from '../../../services/project.service';
import { ProjectProgress } from '../../../models/project-progress.model';
import { ProgressLongCard } from '../../../core/components/progress-long-card/progress-long-card';

@Component({
  selector: 'app-continue-learning',
  imports: [CommonModule, RouterModule, ProgressLongCard],
  templateUrl: './continue-learning.html',
  styleUrl: './continue-learning.scss',
})
export class ContinueLearning implements OnInit {
  private projectService = inject(ProjectService);
  private router = inject(Router);

  inProgress = signal<ProjectProgress[]>([]);

  ngOnInit() {
    this.projectService.getProgressForDashboard().subscribe({
      next: (progress) => {        
        this.inProgress.set((progress ?? []));
      },
      error: () => this.inProgress.set([]),
    });
  }

}
