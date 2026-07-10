export interface AdminProject {
  id: string;
  title: string;
  category: string;
  status: 'published' | 'draft' | 'in-review';
  enrolled: number;
  updatedOn: string;
}
