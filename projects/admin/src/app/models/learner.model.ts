export interface Learner {
  id: string;
  name: string;
  email: string;
  cohort: string;
  progress: number;
  status: 'active' | 'inactive' | 'flagged';
  joinedOn: string;
}
