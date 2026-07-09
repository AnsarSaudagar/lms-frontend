import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project, ProjectStep } from '../../../models/project.model';

@Component({
  selector: 'app-curriculum-list',
  imports: [CommonModule],
  templateUrl: './curriculum-list.html',
  styleUrl: './curriculum-list.scss',
})
export class CurriculumList {
  @Input() project: Project | null = null;
  @Input() steps: ProjectStep[] = [];

  readonly freePreviewCount = 2;

  isLocked(i: number): boolean {
    return !!this.project?.isPaid && i >= this.freePreviewCount;
  }
}
