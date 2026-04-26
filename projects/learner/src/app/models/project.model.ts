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
  slug?: string;
  techStack?: string[];
  prerequisites?: string[];
  learningOutcomes?: string[];
  fileStructure?: Record<string, string>;
  dependencies?: ProjectDependencies;
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
  code?: string;
  language?: string;
  gitCommit?: string;
}

export interface ProjectProgress {
  completed: number[];
  total: number;
}
