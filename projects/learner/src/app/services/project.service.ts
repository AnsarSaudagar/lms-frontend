import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category, Project, ProjectDetail, ProjectStep } from '../models/project.model';
import { map } from 'rxjs';
import { ApiProject } from '../models/api-project.model';

const CATEGORY_COLORS: Record<string, string> = {
  'html-css-js': 'oklch(0.68 0.17 230)',
  react: 'oklch(0.65 0.17 190)',
  angular: 'oklch(0.65 0.20 15)',
  python: 'oklch(0.72 0.17 80)',
  node: 'oklch(0.75 0.17 145)',
  backend: 'oklch(0.75 0.17 145)',
  fullstack: 'oklch(0.65 0.17 265)',
};
const DEFAULT_COLOR = 'oklch(0.68 0.17 270)';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private API_URL = '/projects';
  private http = inject(HttpClient);

  readonly categories: Category[] = [
    { id: 'all', label: 'All Projects' },
    { id: 'web', label: 'HTML / CSS / JS' },
    { id: 'react', label: 'React' },
    { id: 'angular', label: 'Angular' },
    { id: 'python', label: 'Python' },
    { id: 'backend', label: 'Node.js / Express' },
    { id: 'fullstack', label: 'Full-Stack' },
  ];

  getAllProjects() {
    return this.http
      .get<ApiProject[]>(this.API_URL)
      .pipe(map((projects) => projects.map(this.mapApiProject)));
  }

  getProject(slug: string) {
    return this.http.get<ApiProject>(`${this.API_URL}/${slug}`).pipe(
      map(
        (p) =>
          ({
            project: this.mapApiProject(p),
            steps: (p.steps ?? []).map(
              (s): ProjectStep => ({
                title: s.title,
                description: s.description,
                explanation: s.explanation,
                commands: s.commands,
                codeBlocks: s.codeBlocks,
                expectedOutput: s.expectedOutput,
                troubleshooting: s.troubleshooting,
              }),
            ),
          }) as ProjectDetail,
      ),
    );
  }

  enrollFreeProject(projectId: string) {
    return this.http.post(`${this.API_URL}/${projectId}/enroll`, {});
  }

  private mapApiProject(p: ApiProject): Project {
    return {
      id: p._id,
      slug: p.slug,
      title: p.title,
      description: p.description,
      category: p.category,
      isPaid: p.isPaid,
      price: p.price,
      isEnrolled: p.isEnrolled,
      difficulty: p.difficulty.charAt(0).toUpperCase() + p.difficulty.slice(1),
      estimatedTime: `${p.estimatedHours}h`,
      tags: (p.techStack ?? []).slice(0, 3),
      techStack: p.techStack,
      prerequisites: p.prerequisites,
      learningOutcomes: p.learningOutcomes,
      fileStructure: p.fileStructure,
      dependencies: p.dependencies,
      stepCount: p.stepCount ?? 0,
      color: CATEGORY_COLORS[p.category] ?? DEFAULT_COLOR,
    };
  }
}
