export interface ProjectProgress {
  id: string;
  project: Project;
  user: string;
  completedSteps: number[];
  isCompleted: boolean;
  lastVisitedStep: number;
  progressPercent: number;
  createdAt: Date;
  updatedAt: Date;
  completedAt: Date;
}

interface Project {
  id: string;
  slug: string;
  title: string;
}
