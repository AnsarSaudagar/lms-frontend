import { Component, computed, Input } from '@angular/core';
import { WeeklyActivePoint } from '../../../models/dashboard.model';

@Component({
  selector: 'app-weekly-chart',
  templateUrl: './weekly-chart.html',
})
export class WeeklyChart {
  @Input({ required: true }) points: WeeklyActivePoint[] = [];

  maxValue = computed(() => Math.max(...this.points.map(p => p.value), 1));

  heightPercent(value: number): number {
    return Math.round((value / this.maxValue()) * 100);
  }

  isPeak(value: number): boolean {
    return value === this.maxValue();
  }
}
