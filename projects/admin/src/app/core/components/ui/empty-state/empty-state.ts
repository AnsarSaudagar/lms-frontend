import { Component, Input } from '@angular/core';
import { Icon } from '../icon/icon';

@Component({
  selector: 'app-empty-state',
  imports: [Icon],
  template: `
    <div class="flex flex-col items-center justify-center text-center py-24 px-6 bg-surface border border-border rounded-xl">
      <span class="w-12 h-12 rounded-full bg-surface-2 text-text-muted flex items-center justify-center mb-4">
        <app-icon [name]="icon" [size]="22" />
      </span>
      <h3 class="text-base font-semibold text-text mb-1">{{ title }}</h3>
      <p class="text-sm text-text-muted max-w-sm">{{ description }}</p>
    </div>
  `,
})
export class EmptyState {
  @Input() icon = 'folder';
  @Input() title = 'Nothing here yet';
  @Input() description = 'This section is coming soon.';
}
