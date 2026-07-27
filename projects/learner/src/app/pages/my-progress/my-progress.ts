import { Component, inject, signal } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { ProjectProgress } from '../../models/project-progress.model';
import { ProgressLongCard } from '../../core/components/progress-long-card/progress-long-card';

@Component({
  selector: 'app-my-progress',
  imports: [ProgressLongCard],
  templateUrl: './my-progress.html',
  styleUrl: './my-progress.scss',
})
export class MyProgress {
  private projectService = inject(ProjectService);

  readonly allProgresses : any = signal([]);

  ngOnInit(){
    this.projectService.getAllProgress().subscribe({
      next: (res: ProjectProgress[]) => {
        this.allProgresses.set(res);
      }
    })
  }
}
