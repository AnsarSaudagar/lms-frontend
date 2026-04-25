import { Injectable } from '@angular/core';
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

export interface User {
  name: string;
  email: string;
  avatar: string | null;
  githubConnected: boolean;
  isPro?: boolean;
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

  readonly projects: Project[] = [
    {
      id: 'p1', category: 'web', difficulty: 'Beginner', estimatedTime: '2h',
      title: 'Build a Portfolio Site',
      description: 'Create a personal portfolio with responsive layout, smooth scrolling, and a contact form.',
      tags: ['HTML', 'CSS', 'JavaScript'], stepCount: 8,
      color: 'oklch(0.68 0.17 230)',
    },
    {
      id: 'p2', category: 'react', difficulty: 'Intermediate', estimatedTime: '4h',
      title: 'Task Manager App',
      description: 'Build a full-featured task manager with drag-and-drop, local persistence, and filters.',
      tags: ['React', 'Context API', 'CSS Modules'], stepCount: 10,
      color: 'oklch(0.65 0.17 190)', pro: true,
    },
    {
      id: 'p3', category: 'python', difficulty: 'Beginner', estimatedTime: '3h',
      title: 'Web Scraper CLI',
      description: 'Build a command-line web scraper that extracts structured data and exports to CSV.',
      tags: ['Python', 'BeautifulSoup', 'Click'], stepCount: 7,
      color: 'oklch(0.72 0.17 80)',
    },
    {
      id: 'p4', category: 'backend', difficulty: 'Intermediate', estimatedTime: '5h',
      title: 'REST API with Auth',
      description: 'Design and build a RESTful API with JWT authentication, rate limiting, and PostgreSQL.',
      tags: ['Node.js', 'Express', 'PostgreSQL'], stepCount: 12,
      color: 'oklch(0.75 0.17 145)', pro: true,
    },
    {
      id: 'p5', category: 'fullstack', difficulty: 'Advanced', estimatedTime: '8h',
      title: 'Real-Time Chat App',
      description: 'Full-stack chat application with WebSockets, rooms, presence indicators, and message history.',
      tags: ['React', 'Node.js', 'Socket.io'], stepCount: 14,
      color: 'oklch(0.65 0.17 310)', pro: true,
    },
    {
      id: 'p6', category: 'python', difficulty: 'Intermediate', estimatedTime: '4h',
      title: 'ML Image Classifier',
      description: 'Train a CNN to classify images using PyTorch. Deploy with a simple Flask inference API.',
      tags: ['Python', 'PyTorch', 'Flask'], stepCount: 9,
      color: 'oklch(0.68 0.17 30)', pro: true,
    },
    {
      id: 'p7', category: 'react', difficulty: 'Advanced', estimatedTime: '6h',
      title: 'E-Commerce Storefront',
      description: 'Build a complete storefront with cart, checkout flow, Stripe integration, and order history.',
      tags: ['React', 'Stripe', 'Redux'], stepCount: 15,
      color: 'oklch(0.65 0.17 265)', pro: true,
    },
    {
      id: 'p8', category: 'web', difficulty: 'Beginner', estimatedTime: '1.5h',
      title: 'CSS Animation Gallery',
      description: 'Master modern CSS animations: keyframes, transitions, scroll-driven animations, and more.',
      tags: ['HTML', 'CSS', 'Animations'], stepCount: 6,
      color: 'oklch(0.70 0.17 350)',
    },
    {
      id: 'p9',
      color: 'oklch(0.65 0.20 15)',
      // all fields below come directly from the JSON data file
      slug: ANGULAR_TODO_DATA.project.slug,
      category: ANGULAR_TODO_DATA.project.category,
      difficulty: ANGULAR_TODO_DATA.project.difficulty,
      estimatedTime: `${ANGULAR_TODO_DATA.project.estimatedHours}h`,
      title: ANGULAR_TODO_DATA.project.title,
      description: ANGULAR_TODO_DATA.project.description,
      tags: ANGULAR_TODO_DATA.project.techStack.slice(0, 3),
      techStack: ANGULAR_TODO_DATA.project.techStack,
      prerequisites: ANGULAR_TODO_DATA.project.prerequisites,
      learningOutcomes: ANGULAR_TODO_DATA.project.learningOutcomes,
      fileStructure: ANGULAR_TODO_DATA.project.fileStructure,
      dependencies: ANGULAR_TODO_DATA.project.dependencies,
      stepCount: ANGULAR_TODO_DATA.steps.length,
    },
    {
      id: 'p10',
      color: 'oklch(0.68 0.17 230)',
      slug: BASIC_TODO_DATA.project.slug,
      category: BASIC_TODO_DATA.project.category,
      difficulty: BASIC_TODO_DATA.project.difficulty,
      estimatedTime: `${BASIC_TODO_DATA.project.estimatedHours}h`,
      title: BASIC_TODO_DATA.project.title,
      description: BASIC_TODO_DATA.project.description,
      tags: BASIC_TODO_DATA.project.techStack.slice(0, 3),
      techStack: BASIC_TODO_DATA.project.techStack,
      prerequisites: BASIC_TODO_DATA.project.prerequisites,
      learningOutcomes: BASIC_TODO_DATA.project.learningOutcomes,
      fileStructure: BASIC_TODO_DATA.project.fileStructure,
      dependencies: BASIC_TODO_DATA.project.dependencies,
      stepCount: BASIC_TODO_DATA.steps.length,
    },
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
