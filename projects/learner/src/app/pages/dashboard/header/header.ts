import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { CommonService } from '../../../services/common.service';
import { ProjectSummary } from '../../../models/project-summary.model';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit {
  private authService = inject(AuthService);
  private commonService = inject(CommonService);

  userName = computed(() => this.authService.currentUser()?.name ?? '');
  completed = signal(1);
  inProgress = signal(2);
  stepsDone = signal(13);

  lastProject = signal({
    name: 'Web Scraper CLI',
    currentStep: 3,
    totalSteps: 7,
    progress: 40,
  });

  ngOnInit(): void {
    this.commonService.getDashboardProjectSummary().subscribe({
      next: (summary: ProjectSummary) => {
        this.completed.set(summary.completedProjects);
        this.inProgress.set(summary.inProgressProjects);
        this.stepsDone.set(summary.totalStepsCompleted);
      },
    });
  }

  greeting = signal(this.getGreeting());

  private getGreeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  }
}
