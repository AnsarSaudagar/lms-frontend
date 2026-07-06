import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProjectServie } from '../../services/project.service';
import { Project, ProjectStep } from '../../models/project.model';
import { ProjectHeader } from '../core/project-header/project-header';
import { CurriculumList } from '../core/curriculum-list/curriculum-list';
import { PurchaseCard } from '../core/purchase-card/purchase-card';

@Component({
  selector: 'app-project-page',
  imports: [CommonModule, RouterModule, ProjectHeader, CurriculumList, PurchaseCard],
  templateUrl: './project-page.html',
  styleUrl: './project-page.scss',
})
export class ProjectPage implements OnInit {
  private route = inject(ActivatedRoute);
  private projectService = inject(ProjectServie);
  protected router = inject(Router);

  project = signal<Project | null>(null);
  steps = signal<ProjectStep[]>([]);
  loading = signal(true);
  error = signal(false);

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug')!;
    this.projectService.getProject(slug).subscribe({
      next: ({ project, steps }) => {
        this.project.set(project);
        this.steps.set(steps);
        this.loading.set(false);
      },
      error: (err) => {       
        console.error(err);
         
        this.error.set(true);
        this.loading.set(false);
      },
    });
  }
}
