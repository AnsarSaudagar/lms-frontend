import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { Project } from '../../../services/app-data.service';
import { Router, RouterModule } from '@angular/router';
import { ProjectServie } from '../../../services/project.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-project-listing',
  imports: [CommonModule, RouterModule],
  templateUrl: './project-listing.html',
  styleUrl: './project-listing.scss',
})
export class ProjectListing {

  allProjects = signal<Project[]>([]);
  private router = inject(Router);
  private projectService = inject(ProjectServie);
  private authService = inject(AuthService);

  user = this.authService.currentUser;

  @ViewChild('projectsRow') projectsRow?: ElementRef<HTMLElement>;

  ngOnInit() {
    if (!this.user()) { this.router.navigate(['/auth']); return; }
    this.projectService.getAllProjects().subscribe({
      next: (projects: Project[]) => {
        this.allProjects.set(projects);
      }
    })
  }

  scrollProjects(dir: number) {
    this.projectsRow?.nativeElement.scrollBy({ left: dir * 320, behavior: 'smooth' });
  }
}
