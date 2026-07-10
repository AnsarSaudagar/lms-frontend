import { Component } from '@angular/core';
import { EmptyState } from '../../core/components/ui/empty-state/empty-state';

@Component({
  selector: 'app-content',
  imports: [EmptyState],
  template: `
    <div class="flex flex-col gap-6 py-6">
      <div>
        <h1 class="text-2xl font-semibold text-text mb-1">Content</h1>
        <p class="text-sm text-text-muted">Manage curriculum, lessons, and assessments.</p>
      </div>
      <app-empty-state icon="file" title="Content library coming soon" description="Manage lessons, assessments, and certificates from here once this module is built out." />
    </div>
  `,
})
export class ContentComponent {}
