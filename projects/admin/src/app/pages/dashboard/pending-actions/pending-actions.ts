import { Component, Input } from '@angular/core';
import { Icon } from '../../../core/components/ui/icon/icon';
import { PendingAction } from '../../../models/dashboard.model';

const TONE_CLASS: Record<PendingAction['tone'], string> = {
  warning: 'bg-warning-soft text-warning',
  info: 'bg-info-soft text-info',
  neutral: 'bg-surface-2 text-text-2',
};

@Component({
  selector: 'app-pending-actions',
  imports: [Icon],
  templateUrl: './pending-actions.html',
})
export class PendingActions {
  @Input({ required: true }) actions: PendingAction[] = [];
  protected readonly TONE_CLASS = TONE_CLASS;
}
