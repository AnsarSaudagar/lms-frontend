import { Component, OnDestroy, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription, interval, switchMap, takeWhile, tap } from 'rxjs';
import { ButtonDirective } from '../../../core/components/ui/button/button';
import { Card } from '../../../core/components/ui/card/card';
import { Badge, BadgeTone } from '../../../core/components/ui/badge/badge';
import { ProjectsService } from '../../../services/projects.service';
import {
  GenerateProjectRequest,
  GenerationJobStatus,
  ProjectCategory,
  ProjectDifficulty,
} from '../../../models/generator.model';

const STATUS_TONE: Partial<Record<GenerationJobStatus, BadgeTone>> = {
  queued: 'info',
  waiting: 'info',
  active: 'warning',
  completed: 'success',
  failed: 'error',
};

@Component({
  selector: 'app-create-project',
  imports: [ReactiveFormsModule, ButtonDirective, Card, Badge],
  templateUrl: './create-project.html',
})
export class CreateProjectComponent implements OnDestroy {
  private fb = inject(FormBuilder);
  private projectsService = inject(ProjectsService);
  private router = inject(Router);

  submitting = signal(false);
  errorMessage = signal<string | null>(null);
  jobId = signal<string | null>(null);
  jobStatus = signal<GenerationJobStatus | null>(null);
  jobError = signal<string | null>(null);
  polling = signal(false);
  private pollSub?: Subscription;

  categories: ProjectCategory[] = ['react', 'angular', 'html-css-js', 'ml', 'nodejs'];
  difficulties: ProjectDifficulty[] = ['beginner', 'intermediate', 'advanced'];

  protected readonly STATUS_TONE = STATUS_TONE;

  form = this.fb.group({
    topic: ['', Validators.required],
    category: [''],
    difficulty: [''],
    estimatedHours: [null as number | null],
    isPaid: [false],
    price: [null as number | null],
  });

  constructor() {
    this.form.get('isPaid')!.valueChanges.subscribe(isPaid => {
      const priceControl = this.form.get('price')!;
      if (isPaid) {
        priceControl.setValidators([Validators.required, Validators.min(1)]);
      } else {
        priceControl.clearValidators();
      }
      priceControl.updateValueAndValidity();
    });
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.errorMessage.set(null);
    this.submitting.set(true);

    const raw = this.form.getRawValue();
    const dto: GenerateProjectRequest = {
      topic: raw.topic!,
      ...(raw.category ? { category: raw.category as ProjectCategory } : {}),
      ...(raw.difficulty ? { difficulty: raw.difficulty as ProjectDifficulty } : {}),
      ...(raw.estimatedHours != null ? { estimatedHours: raw.estimatedHours } : {}),
      ...(raw.isPaid ? { isPaid: true, price: raw.price! } : { isPaid: false }),
    };

    this.projectsService.generateProject(dto).subscribe({
      next: res => {
        this.submitting.set(false);
        this.jobId.set(res.jobId);
        this.jobStatus.set('queued');
        this.startPolling(res.jobId);
      },
      error: (err: HttpErrorResponse) => {
        this.submitting.set(false);
        this.errorMessage.set(err.error?.message ?? 'Failed to start project generation.');
      },
    });
  }

  private startPolling(jobId: string) {
    this.polling.set(true);
    this.pollSub = interval(2000)
      .pipe(
        switchMap(() => this.projectsService.getGenerationJobStatus(jobId)),
        tap(res => {
          this.jobStatus.set(res.status);
          if (res.error) this.jobError.set(res.error);
        }),
        takeWhile(res => res.status !== 'completed' && res.status !== 'failed', true),
      )
      .subscribe({
        complete: () => this.polling.set(false),
        error: () => {
          this.polling.set(false);
          this.jobError.set('Lost connection while checking generation status.');
        },
      });
  }

  viewProjects() {
    this.router.navigateByUrl('/projects');
  }

  ngOnDestroy() {
    this.pollSub?.unsubscribe();
  }
}
