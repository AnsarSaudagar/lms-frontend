import { Component, Input } from '@angular/core';

export type BadgeTone = 'success' | 'warning' | 'error' | 'info' | 'neutral';

const TONES: Record<BadgeTone, string> = {
  success: 'bg-success-soft text-accent-dark',
  warning: 'bg-warning-soft text-warning',
  error: 'bg-error-soft text-error',
  info: 'bg-info-soft text-info',
  neutral: 'bg-surface-2 text-text-2',
};

@Component({
  selector: 'app-badge',
  template: `
    <span
      class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
      [class]="TONES[tone]"
    >
      <ng-content />
    </span>
  `,
})
export class Badge {
  @Input() tone: BadgeTone = 'neutral';
  protected readonly TONES = TONES;
}
