import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../../models/project.model';

@Component({
  selector: 'app-purchase-card',
  imports: [CommonModule],
  templateUrl: './purchase-card.html',
  styleUrl: './purchase-card.scss',
})
export class PurchaseCard {
  @Input() project: Project | null = null;

  get discountPct(): number {
    const p = this.project;
    if (!p?.originalPrice || !p.price) return 0;
    return Math.round((1 - p.price / p.originalPrice) * 100);
  }
}
