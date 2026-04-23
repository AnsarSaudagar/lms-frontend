import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AppDataService, Project, User, ProjectProgress } from '../../services/app-data.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class DashboardComponent implements OnInit {
  private appData = inject(AppDataService);
  private router = inject(Router);

  categories = this.appData.categories;
  allProjects = this.appData.projects;

  user : any = signal<User | null>(null);
  progress = signal<Record<string, ProjectProgress>>({});
  activeCategory = signal('all');
  search = signal('');
  upgradeTarget = signal<Project | null>(null);

  filtered = computed(() => {
    const cat = this.activeCategory();
    const q = this.search().toLowerCase();
    return this.allProjects.filter(p => {
      const matchCat = cat === 'all' || p.category === cat;
      const matchSearch = !q || p.title.toLowerCase().includes(q) || p.tags.some(t => t.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  });

  inProgress = computed(() =>
    this.allProjects.filter(p => {
      const pr = this.progress()[p.id];
      return pr && pr.completed.length > 0 && pr.completed.length < pr.total;
    })
  );

  ngOnInit() {
    const u = this.appData.loadUser();
    if (!u) { this.router.navigate(['/auth']); return; }
    this.user.set(u);
    this.progress.set(this.appData.loadProgress());
  }

  getProgress(id: string): number {
    const p = this.progress()[id];
    if (!p || p.total === 0) return 0;
    return Math.round((p.completed.length / p.total) * 100);
  }

  handleCardClick(p: Project) {
    if (p.pro && !this.user()?.isPro) { this.upgradeTarget.set(p); return; }
    this.router.navigate(['/project', p.id]);
  }

  handleUpgrade() {
    const u = this.user()!;
    const upgraded = { ...u, isPro: true };
    this.appData.saveUser(upgraded);
    this.user.set(upgraded);
    const target = this.upgradeTarget()!;
    this.upgradeTarget.set(null);
    this.router.navigate(['/project', target.id]);
  }

  logout() {
    this.appData.saveUser(null);
    this.router.navigate(['/']);
  }

  proFeatures = ['All 40+ projects unlocked', 'AI-generated guides for any topic', 'Priority support', 'Certificate of completion'];

  activeCategoryLabel(): string {
    return this.categories.find(c => c.id === this.activeCategory())?.label ?? 'All Projects';
  }
}
