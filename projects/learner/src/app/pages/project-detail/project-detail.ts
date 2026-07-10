import { Component, signal, inject, OnInit, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Project, ProjectStep } from '../../models/project.model';
import { AuthService } from '../../services/auth.service';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-project-detail',
  imports: [CommonModule],
  templateUrl: './project-detail.html',
  styleUrl: './project-detail.scss',
})
export class ProjectDetailComponent implements OnInit {
  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);
  private sanitizer = inject(DomSanitizer);
  protected router = inject(Router);
  private projectService = inject(ProjectService);

  project = signal<Project | null>(null);
  user = this.authService.currentUser;
  steps = signal<ProjectStep[] | null>(null);
  generating = signal(false);
  activeStep = signal(0);
  completed = signal<number[]>([]);
  copied = signal('');

  constructor() {
    effect(() => {
      if (this.steps()) {
        setTimeout(() => (window as any)['hljs']?.highlightAll(), 0);
      }
    });
  }

  ngOnInit() {
    const slug = this.route.snapshot.params['slug'];

    this.generating.set(true);
    this.projectService.getProject(slug).subscribe({
      next: ({ project, steps }) => {
        this.project.set(project);
        this.steps.set(steps);
        this.generating.set(false);

      },
      error: () => this.generating.set(false),
    });

  }

  markComplete(activeStep: number){
    const projectId = this.project()?.id;
    if (!projectId) return;

    this.projectService.markStepAsCompleted(projectId, activeStep+1).subscribe(() => {
      if (!this.completed().includes(activeStep)) {
        this.completed.update((c) => [...c, activeStep]);
      }
    });
  }

  renderMarkdown(text: string): SafeHtml {
    let html = text;

    // fenced code blocks first
    html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
      const escaped = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      return `<pre class="md-pre"><code class="language-${lang || 'text'} md-code">${escaped.trimEnd()}</code></pre>`;
    });

    // headings
    html = html.replace(/^### (.+)$/gm, '<h3 class="md-h3">$1</h3>');
    html = html.replace(/^## (.+)$/gm, '<h2 class="md-h2">$1</h2>');

    // bold
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

    // inline code
    html = html.replace(/`([^`\n]+)`/g, '<code class="md-inline">$1</code>');

    // paragraph wrapping: split on double newlines, skip block-level tags
    const blocks = html.split(/\n\n+/);
    html = blocks.map(block => {
      block = block.trim();
      if (!block) return '';
      if (/^<(h[23]|pre|ul|ol|li|table)/.test(block)) return block;
      return `<p class="md-p">${block.replace(/\n/g, '<br>')}</p>`;
    }).join('\n');

    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  get step(): ProjectStep | null {
    const s = this.steps();
    return s ? s[this.activeStep()] ?? null : null;
  }

  get totalSteps(): number { return this.steps()?.length ?? this.project()?.stepCount ?? 0; }

  get pct(): number {
    const t = this.totalSteps;
    return t > 0 ? Math.round((this.completed().length / t) * 100) : 0;
  }

  copyToClipboard(text: string, key: string) {
    navigator.clipboard.writeText(text).catch(() => {});
    this.copied.set(key);
    setTimeout(() => this.copied.set(''), 2000);
  }

  nextStep() {
    const next = Math.min(this.totalSteps - 1, this.activeStep() + 1);
    this.activeStep.set(next);
  }

  
}
