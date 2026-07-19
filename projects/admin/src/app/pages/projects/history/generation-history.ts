import { Component, inject, signal } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { Badge, BadgeTone } from '../../../core/components/ui/badge/badge';
import { EmptyState } from '../../../core/components/ui/empty-state/empty-state';
import { ProjectsService } from '../../../services/projects.service';
import { GenerationHistoryItem } from '../../../models/generator.model';

const STATUS_TONE: Partial<Record<string, BadgeTone>> = {
  queued: 'info',
  waiting: 'info',
  processing: 'warning',
  active: 'warning',
  completed: 'success',
  failed: 'error',
};

@Component({
  selector: 'app-generation-history',
  imports: [Badge, EmptyState, DatePipe, DecimalPipe],
  templateUrl: './generation-history.html',
})
export class GenerationHistoryComponent {
  private projectsService = inject(ProjectsService);

  history = signal<GenerationHistoryItem[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  protected readonly STATUS_TONE = STATUS_TONE;

  constructor() {
    this.projectsService.getGenerationHistory().subscribe({
      next: data => {
        this.history.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load generation history.');
        this.loading.set(false);
      },
    });
  }
}
