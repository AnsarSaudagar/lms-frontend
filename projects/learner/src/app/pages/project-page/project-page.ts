import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProjectServie } from '../../services/project.service';
import { Project } from '../../models/project.model';
import { ProjectHeader } from '../core/project-header/project-header';

@Component({
  selector: 'app-project-page',
  imports: [CommonModule, RouterModule, ProjectHeader],
  templateUrl: './project-page.html',
  styleUrl: './project-page.scss',
})
export class ProjectPage implements OnInit {
  private route = inject(ActivatedRoute);
  private projectService = inject(ProjectServie);
  protected router = inject(Router);

  project = signal<Project | null>(null);
  loading = signal(true);
  error = signal(false);

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug')!;
    this.projectService.getProject(slug).subscribe({
      next: ({ project }) => {
        this.project.set(project);
        this.loading.set(false);
      },
      error: () => {
        this.error.set(true);
        this.loading.set(false);
      },
    });
  }
}
