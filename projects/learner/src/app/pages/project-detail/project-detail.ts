import { Component, signal, inject, OnInit, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AppDataService, Project, ProjectStep, User } from '../../services/app-data.service';

@Component({
  selector: 'app-project-detail',
  imports: [CommonModule],
  templateUrl: './project-detail.html',
  styleUrl: './project-detail.scss',
})
export class ProjectDetailComponent implements OnInit {
  private appData = inject(AppDataService);
  private route = inject(ActivatedRoute);
  private sanitizer = inject(DomSanitizer);
  protected router = inject(Router);

  project = signal<Project | null>(null);
  user = signal<User | null>(null);
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
    this.user.set(this.appData.loadUser());
    const id = this.route.snapshot.params['id'];
    const p = this.appData.projects.find(x => x.id === id) ?? null;
    if (!p) { this.router.navigate(['/dashboard']); return; }
    this.project.set(p);

    const progress = this.appData.loadProgress()[id];
    if (progress) this.completed.set(progress.completed);

    const cached = this.appData.loadSteps(id);
    if (cached) { this.steps.set(cached); }
    else { this.generateSteps(p); }
  }

  async generateSteps(p: Project) {
    this.generating.set(true);
    await new Promise(r => setTimeout(r, 1200));
    const stepTitles = ['Project Setup', 'Install Dependencies', 'Create Entry Point', 'Add Core Logic',
      'Style Components', 'Add Routing', 'Connect API', 'Write Tests', 'Optimize', 'Deploy', 'Final Touches', 'Review'];
    const fallback: ProjectStep[] = Array.from({ length: p.stepCount }, (_, i) => ({
      title: `Step ${i + 1}: ${stepTitles[i] ?? 'Build Feature'}`,
      description: `In this step, we build the foundation for "${p.title}". Follow the code snippet carefully and verify everything works before moving on.`,
      code: i === 0
        ? `mkdir ${p.title.toLowerCase().replace(/\s+/g, '-')}\ncd ${p.title.toLowerCase().replace(/\s+/g, '-')}\nnpm init -y`
        : `// Step ${i + 1}\nconsole.log('Step ${i + 1} complete');`,
      language: p.tags[0]?.toLowerCase().includes('python') ? 'python' : 'javascript',
      gitCommit: `git commit -m "step ${i + 1}: ${(stepTitles[i] ?? 'add feature').toLowerCase().replace(/\s/g, '-')}"`,
    }));
    this.appData.saveSteps(p.id, fallback);
    this.steps.set(fallback);
    this.saveProgress(fallback.length);
    this.generating.set(false);
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

  markComplete(idx: number) {
    const current = this.completed();
    const next = current.includes(idx) ? current.filter(i => i !== idx) : [...current, idx];
    this.completed.set(next);
    this.saveProgress(this.totalSteps);
    if (!current.includes(idx) && idx < this.totalSteps - 1) {
      setTimeout(() => this.activeStep.set(idx + 1), 300);
    }
  }

  copyToClipboard(text: string, key: string) {
    navigator.clipboard.writeText(text).catch(() => {});
    this.copied.set(key);
    setTimeout(() => this.copied.set(''), 2000);
  }

  nextStep() {
    const next = Math.min(this.totalSteps - 1, this.activeStep() + 1);
    this.markComplete(this.activeStep());
    this.activeStep.set(next);
  }

  private saveProgress(total: number) {
    const p = this.appData.loadProgress();
    p[this.project()!.id] = { completed: this.completed(), total };
    this.appData.saveProgress(p);
  }
}
