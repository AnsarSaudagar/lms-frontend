import { inject, Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Project, ProjectStep } from "./app-data.service";
import { map } from "rxjs";

interface ApiCodeBlock {
  filename: string;
  language: string;
  action: string;
  code: string;
  explanation: string;
}

interface ApiStep {
  stepNumber: number;
  title: string;
  description: string;
  explanation?: string;
  commands?: string[];
  codeBlocks?: ApiCodeBlock[];
  expectedOutput?: string;
  troubleshooting?: string[];
}

interface ApiProject {
  _id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  estimatedHours: number;
  techStack: string[];
  prerequisites?: string[];
  learningOutcomes?: string[];
  fileStructure?: Record<string, string>;
  dependencies?: { installCommands?: string[] };
  stepCount?: number;
  steps?: ApiStep[];
}

export interface ProjectDetail {
  project: Project;
  steps: ProjectStep[];
}

const CATEGORY_COLORS: Record<string, string> = {
  'html-css-js': 'oklch(0.68 0.17 230)',
  'react':       'oklch(0.65 0.17 190)',
  'angular':     'oklch(0.65 0.20 15)',
  'python':      'oklch(0.72 0.17 80)',
  'node':        'oklch(0.75 0.17 145)',
  'backend':     'oklch(0.75 0.17 145)',
  'fullstack':   'oklch(0.65 0.17 265)',
};
const DEFAULT_COLOR = 'oklch(0.68 0.17 270)';

function mapApiProject(p: ApiProject): Project {
  return {
    id: p._id,
    slug: p.slug,
    title: p.title,
    description: p.description,
    category: p.category,
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

@Injectable({ providedIn: 'root' })
export class ProjectServie {
  private API_URL = environment.API_URL + '/projects';
  private http = inject(HttpClient);

  getAllProjects() {
    return this.http.get<ApiProject[]>(this.API_URL).pipe(
      map(projects => projects.map(mapApiProject))
    );
  }

  getProject(id: string) {
    return this.http.get<ApiProject>(`${this.API_URL}/${id}`).pipe(
      map(p => ({
        project: mapApiProject(p),
        steps: (p.steps ?? []).map((s): ProjectStep => ({
          title: s.title,
          description: s.description,
          explanation: s.explanation,
          commands: s.commands,
          codeBlocks: s.codeBlocks,
          expectedOutput: s.expectedOutput,
          troubleshooting: s.troubleshooting,
        })),
      } as ProjectDetail))
    );
  }
}
