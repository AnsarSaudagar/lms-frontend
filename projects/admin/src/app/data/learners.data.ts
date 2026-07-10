import { Learner } from '../models/learner.model';

export const LEARNERS: Learner[] = [
  { id: 'lrn_1', name: 'Ava Chen', email: 'ava.chen@mail.com', cohort: 'Fall 2026', progress: 82, status: 'active', joinedOn: '2026-01-12' },
  { id: 'lrn_2', name: 'Noah Kim', email: 'noah.kim@mail.com', cohort: 'Fall 2026', progress: 45, status: 'active', joinedOn: '2026-02-03' },
  { id: 'lrn_3', name: 'Maria Lopez', email: 'maria.lopez@mail.com', cohort: 'Spring 2026', progress: 12, status: 'flagged', joinedOn: '2026-03-21' },
  { id: 'lrn_4', name: 'James Carter', email: 'james.carter@mail.com', cohort: 'Fall 2026', progress: 100, status: 'active', joinedOn: '2025-11-08' },
  { id: 'lrn_5', name: 'Priya Nair', email: 'priya.nair@mail.com', cohort: 'Spring 2026', progress: 0, status: 'inactive', joinedOn: '2026-04-02' },
];
