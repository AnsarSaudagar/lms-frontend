import { Component } from '@angular/core';
import { EmptyState } from '../../core/components/ui/empty-state/empty-state';

@Component({
  selector: 'app-settings',
  imports: [EmptyState],
  template: `
    <div class="flex flex-col gap-6 py-6">
      <div>
        <h1 class="text-2xl font-semibold text-text mb-1">Settings</h1>
        <p class="text-sm text-text-muted">Platform configuration and admin preferences.</p>
      </div>
      <app-empty-state icon="settings" title="Settings coming soon" description="Platform, billing, and team preferences will be configurable here." />
    </div>
  `,
})
export class SettingsComponent {}
