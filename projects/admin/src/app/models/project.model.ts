export interface AdminProject {
  _id: string;
  slug: string;
  title: string;
  description?: string;
  category: string;
  difficulty: string;
  estimatedHours?: number;
  techStack?: string[];
  prerequisites?: string[];
  learningOutcomes?: string[];
  isPaid: boolean;
  price?: number;
  stepCount: number;
  isEnrolled: boolean;
  createdAt: string;
  updatedAt: string;
}
