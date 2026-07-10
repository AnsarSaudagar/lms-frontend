export interface ApiCodeBlock {
  filename: string;
  language: string;
  action: string;
  code: string;
  explanation: string;
}

export interface ApiStep {
  stepNumber: number;
  title: string;
  description: string;
  explanation?: string;
  commands?: string[];
  codeBlocks?: ApiCodeBlock[];
  expectedOutput?: string;
  troubleshooting?: string[];
}

export interface ApiProject {
  _id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  estimatedHours: number;
  techStack: string[];
  isPaid: boolean;
  price?:number;
  isEnrolled?: boolean;
  prerequisites?: string[];
  learningOutcomes?: string[];
  fileStructure?: Record<string, string>;
  dependencies?: { installCommands?: string[] };
  stepCount?: number;
  steps?: ApiStep[];
}