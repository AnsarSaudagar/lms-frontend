import { AdminProject } from '../models/project.model';

export const ADMIN_PROJECTS: AdminProject[] = [
  { id: 'prj_1', title: 'React Weather App', category: 'Frontend', status: 'published', enrolled: 214, updatedOn: '2026-06-28' },
  { id: 'prj_2', title: 'Node API Bootcamp', category: 'Backend', status: 'published', enrolled: 189, updatedOn: '2026-06-20' },
  { id: 'prj_3', title: 'Web Scraper CLI', category: 'Python', status: 'in-review', enrolled: 0, updatedOn: '2026-07-05' },
  { id: 'prj_4', title: 'Portfolio Site Builder', category: 'Frontend', status: 'draft', enrolled: 0, updatedOn: '2026-07-08' },
];
