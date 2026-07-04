import { Injectable } from '@angular/core';
import type { User } from './auth.service';
export type { User } from './auth.service';
import { ANGULAR_TODO_DATA } from '../data/todo-app-angular.data';
import { BASIC_TODO_DATA } from '../data/todo-app-basic.data';

export interface ProjectDependencies {
  npm?: Record<string, string>;
  installCommands?: string[];
}

export interface Project {
  id: string;
  category: string;
  difficulty: string;
  estimatedTime: string;
  title: string;
  description: string;
  isPaid: boolean;
  price?:number;
  tags: string[];
  stepCount: number;
  color: string;
  pro?: boolean;
  // Rich metadata — present on fully-authored projects
  slug?: string;
  techStack?: string[];
  prerequisites?: string[];
  learningOutcomes?: string[];
  fileStructure?: Record<string, string>;
  dependencies?: ProjectDependencies;
}

export interface Category {
  id: string;
  label: string;
}

export interface CodeBlock {
  filename: string;
  language: string;
  action: string;
  code: string;
  explanation: string;
}

export interface ProjectStep {
  title: string;
  description: string;
  explanation?: string;
  commands?: string[];
  codeBlocks?: CodeBlock[];
  expectedOutput?: string;
  troubleshooting?: string[];
  // legacy fields kept for fallback generated steps
  code?: string;
  language?: string;
  gitCommit?: string;
}

export interface ProjectProgress {
  completed: number[];
  total: number;
}


@Injectable({ providedIn: 'root' })
export class AppDataService {
  private readonly staticSteps: Record<string, ProjectStep[]> = {
    p9: ANGULAR_TODO_DATA.steps,
    p10: BASIC_TODO_DATA.steps,
  };

  readonly categories: Category[] = [
    { id: 'all',       label: 'All Projects' },
    { id: 'web',       label: 'HTML / CSS / JS' },
    { id: 'react',     label: 'React' },
    { id: 'angular',   label: 'Angular' },
    { id: 'python',    label: 'Python' },
    { id: 'backend',   label: 'Node.js / Express' },
    { id: 'fullstack', label: 'Full-Stack' },
  ];

  

  loadProgress(): Record<string, ProjectProgress> {
    try { return JSON.parse(localStorage.getItem('devpath_progress') || '{}'); }
    catch { return {}; }
  }

  saveProgress(data: Record<string, ProjectProgress>): void {
    localStorage.setItem('devpath_progress', JSON.stringify(data));
  }

  loadUser(): User | null {
    try { return JSON.parse(localStorage.getItem('devpath_user') || 'null'); }
    catch { return null; }
  }

  saveUser(user: User | null): void {
    localStorage.setItem('devpath_user', JSON.stringify(user));
  }

  loadSteps(projectId: string): ProjectStep[] | null {
    if (this.staticSteps[projectId]) return this.staticSteps[projectId];
    try { return JSON.parse(localStorage.getItem(`devpath_steps_${projectId}`) || 'null'); }
    catch { return null; }
  }

  saveSteps(projectId: string, steps: ProjectStep[]): void {
    localStorage.setItem(`devpath_steps_${projectId}`, JSON.stringify(steps));
  }
}
