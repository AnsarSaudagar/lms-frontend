import { Component, OnDestroy, OnInit, inject, signal, computed } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription, interval, switchMap, takeWhile, tap } from 'rxjs';
import { Card } from '../../../../core/components/ui/card/card';
import { Badge, BadgeTone } from '../../../../core/components/ui/badge/badge';
import { ProjectsService } from '../../../../services/projects.service';
import { GenerationHistoryItem } from '../../../../models/generator.model';

const STATUS_TONE: Partial<Record<string, BadgeTone>> = {
  queued: 'info',
  waiting: 'info',
  processing: 'warning',
  active: 'warning',
  completed: 'success',
  failed: 'error',
};

const TERMINAL_STATUSES = ['completed', 'failed'];

@Component({
  selector: 'app-job-detail',
  imports: [Card, Badge, DatePipe, DecimalPipe, RouterLink],
  templateUrl: './job-detail.html',
})
export class JobDetailComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private projectsService = inject(ProjectsService);
  private pollSub?: Subscription;

  jobId = '';
  job = signal<GenerationHistoryItem | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);
  polling = signal(false);

  protected readonly STATUS_TONE = STATUS_TONE;

  progressPercent = computed(() => {
    const job = this.job();
    if (!job?.stepCount) return 0;
    return Math.round(((job.stepsCompleted ?? 0) / job.stepCount) * 100);
  });

  // Newest first — easier to see the latest activity without scrolling.
  logsNewestFirst = computed(() => [...(this.job()?.logs ?? [])].reverse());

  ngOnInit() {
    this.jobId = this.route.snapshot.paramMap.get('jobId')!;
    this.startPolling();
  }

  private startPolling() {
    this.polling.set(true);
    this.pollSub = interval(2000)
      .pipe(
        switchMap(() => this.projectsService.getGenerationHistoryDetail(this.jobId)),
        tap(job => {
          this.job.set(job);
          this.loading.set(false);
        }),
        takeWhile(job => !TERMINAL_STATUSES.includes(job.status), true),
      )
      .subscribe({
        complete: () => this.polling.set(false),
        error: (err: HttpErrorResponse) => {
          this.polling.set(false);
          this.loading.set(false);
          this.error.set(err.status === 404 ? 'No job found with this id.' : 'Failed to load job status.');
        },
      });
  }

  ngOnDestroy() {
    this.pollSub?.unsubscribe();
  }
}
