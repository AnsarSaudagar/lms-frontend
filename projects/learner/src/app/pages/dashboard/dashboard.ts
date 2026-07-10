import { Component, signal, computed, inject, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Project } from '../../models/project.model';
import { AuthService } from '../../services/auth.service';
import { Header } from './header/header';
import { ProjectListing } from './project-listing/project-listing';
import { ProjectService } from '../../services/project.service';
import { ProjectProgress } from '../../models/project-progress.model';
import { ContinueLearning } from './continue-learning/continue-learning';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule, Header, ProjectListing, ContinueLearning],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class DashboardComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private projectService = inject(ProjectService);

  categories = this.projectService.categories;

  user = this.authService.currentUser;
  progress = signal<Record<string, ProjectProgress>>({});
  activeCategory = signal('all');
  search = signal('');
  upgradeTarget = signal<Project | null>(null);

  ngOnInit() {
    
  }

  getProgress(id: string) {
   
  }


  handleCardClick(p: Project) {
    // if (p.pro && !this.user()?.isPro) { this.upgradeTarget.set(p); return; }
    this.router.navigate(['/project', p.id]);
  }

  handleUpgrade() {
    this.authService.updateUser({ isPro: true });
    const target = this.upgradeTarget()!;
    this.upgradeTarget.set(null);
    this.router.navigate(['/project', target.id]);
  }

  logout() {
    this.authService.logout();
  }

  proFeatures = ['All 40+ projects unlocked', 'AI-generated guides for any topic', 'Priority support', 'Certificate of completion'];

  activeCategoryLabel(): string {
    return this.categories.find(c => c.id === this.activeCategory())?.label ?? 'All Projects';
  }
}
