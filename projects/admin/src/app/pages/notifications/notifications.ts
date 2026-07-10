import { Component } from '@angular/core';
import { EmptyState } from '../../core/components/ui/empty-state/empty-state';

@Component({
  selector: 'app-notifications',
  imports: [EmptyState],
  template: `
    <div class="flex flex-col gap-6 py-6">
      <div>
        <h1 class="text-2xl font-semibold text-text mb-1">Notifications</h1>
        <p class="text-sm text-text-muted">Schedule and review platform-wide notifications.</p>
      </div>
      <app-empty-state icon="bell" title="Notification center coming soon" description="Compose and schedule announcements to learners from here." />
    </div>
  `,
})
export class NotificationsComponent {}
