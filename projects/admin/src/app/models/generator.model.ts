export type ProjectCategory = 'react' | 'angular' | 'html-css-js' | 'ml' | 'nodejs';
export type ProjectDifficulty = 'beginner' | 'intermediate' | 'advanced';

export interface GenerateProjectRequest {
  topic: string;
  category?: ProjectCategory;
  difficulty?: ProjectDifficulty;
  estimatedHours?: number;
  isPaid?: boolean;
  price?: number;
}

export interface GenerateProjectResponse {
  jobId: string;
  status: 'queued';
}

export type GenerationJobStatus = 'waiting' | 'active' | 'completed' | 'failed' | string;

export interface GenerationJobResult {
  jobId: string;
  status: GenerationJobStatus;
  topic: string;
  result?: { project: unknown; generated: unknown };
  error?: string;
}

export interface GenerationLogEntry {
  at: string;
  message: string;
}

export interface GenerationHistoryItem {
  jobId: string;
  topic: string;
  category?: string;
  difficulty?: string;
  estimatedHours?: number;
  requestedBy?: string;
  status: string;
  projectSlug?: string;
  stepCount?: number;
  stepsCompleted?: number;
  currentModel?: string;
  logs?: GenerationLogEntry[];
  errorMessage?: string;
  attemptsMade?: number;
  startedAt?: string;
  completedAt?: string;
  durationMs?: number;
}
