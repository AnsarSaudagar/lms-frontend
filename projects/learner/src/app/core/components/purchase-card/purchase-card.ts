import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Project } from '../../../models/project.model';
import { ProjectService } from '../../../services/project.service';

@Component({
  selector: 'app-purchase-card',
  imports: [CommonModule],
  templateUrl: './purchase-card.html',
  styleUrl: './purchase-card.scss',
})
export class PurchaseCard {
  private router = inject(Router);
  private projectService = inject(ProjectService);

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

    if(!this.project){
      return;
    }

    this.projectService.enrollFreeProject(this.project?.id).subscribe({
      next: () => {
        const url = this.router.url;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([url]);
        });
      }, error: (err) => {
        alert(err)
      }
    })
  }
}
