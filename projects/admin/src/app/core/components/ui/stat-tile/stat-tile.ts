import { Component, Input } from '@angular/core';
import { Icon } from '../icon/icon';
import { StatCard } from '../../../../models/dashboard.model';

const TREND_CLASS: Record<StatCard['trendTone'], string> = {
  positive: 'text-accent-dark',
  negative: 'text-error',
  neutral: 'text-text-muted',
};

@Component({
  selector: 'app-stat-tile',
  imports: [Icon],
  template: `
    <div class="bg-surface border border-border rounded-xl shadow-xs p-5 flex flex-col gap-4">
      <div class="flex items-center justify-between">
        <span class="text-sm text-text-2">{{ stat.label }}</span>
        <span class="w-8 h-8 rounded-lg bg-success-soft text-accent-dark flex items-center justify-center">
          <app-icon [name]="stat.icon" [size]="16" />
        </span>
      </div>
      <span class="text-3xl font-semibold text-text leading-none">{{ stat.value }}</span>
      <span class="text-xs font-medium" [class]="TREND_CLASS[stat.trendTone]">{{ stat.trend }}</span>
    </div>
  `,
})
export class StatTile {
  @Input({ required: true }) stat!: StatCard;
  protected readonly TREND_CLASS = TREND_CLASS;
}
