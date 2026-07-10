import { Component } from '@angular/core';
import { Badge, BadgeTone } from '../../core/components/ui/badge/badge';
import { ADMIN_PROJECTS } from '../../data/projects.data';
import { AdminProject } from '../../models/project.model';

const STATUS_TONE: Record<AdminProject['status'], BadgeTone> = {
  published: 'success',
  draft: 'neutral',
  'in-review': 'warning',
};

@Component({
  selector: 'app-projects',
  imports: [Badge],
  templateUrl: './projects.html',
})
export class ProjectsComponent {
  projects = ADMIN_PROJECTS;
  protected readonly STATUS_TONE = STATUS_TONE;
}
