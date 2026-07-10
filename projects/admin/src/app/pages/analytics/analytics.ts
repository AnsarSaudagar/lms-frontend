import { Component } from '@angular/core';
import { EmptyState } from '../../core/components/ui/empty-state/empty-state';

@Component({
  selector: 'app-analytics',
  imports: [EmptyState],
  template: `
    <div class="flex flex-col gap-6 py-6">
      <div>
        <h1 class="text-2xl font-semibold text-text mb-1">Analytics</h1>
        <p class="text-sm text-text-muted">Deep-dive metrics on learner engagement and revenue.</p>
      </div>
      <app-empty-state icon="bar-chart" title="Analytics coming soon" description="Detailed engagement, retention, and revenue breakdowns will live here." />
    </div>
  `,
})
export class AnalyticsComponent {}
