import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Project } from '../../../models/project.model';

@Component({
  selector: 'app-purchase-card',
  imports: [CommonModule],
  templateUrl: './purchase-card.html',
  styleUrl: './purchase-card.scss',
})
export class PurchaseCard {
  private router = inject(Router);

  @Input() project: Project | null = null;

  get discountPct(): number {
    const p = this.project;
    if (!p?.originalPrice || !p.price) return 0;
    return Math.round((1 - p.price / p.originalPrice) * 100);
  }

  startProject() {
    const p = this.project!;
    this.router.navigate(['/learner/project', p.slug ?? p.id, 'learn']);
  }

  enrollProject(){
    
  }
}
