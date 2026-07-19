import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdminProject } from '../models/project.model';
import {
  GenerateProjectRequest,
  GenerateProjectResponse,
  GenerationHistoryItem,
  GenerationJobResult,
} from '../models/generator.model';

@Injectable({ providedIn: 'root' })
export class ProjectsService {
  private http = inject(HttpClient);

  getAllProjects() {
    return this.http.get<AdminProject[]>('/projects');
  }

  getProjectBySlug(slug: string) {
    return this.http.get<AdminProject & { steps: unknown[] }>(`/projects/${slug}`);
  }

  generateProject(dto: GenerateProjectRequest) {
    return this.http.post<GenerateProjectResponse>('/admin/generator/projects', dto);
  }

  getGenerationJobStatus(jobId: string) {
    return this.http.get<GenerationJobResult>(`/admin/generator/projects/${jobId}`);
  }

  getGenerationHistory() {
    return this.http.get<GenerationHistoryItem[]>('/admin/generator/history');
  }

  getGenerationHistoryDetail(jobId: string) {
    return this.http.get<GenerationHistoryItem>(`/admin/generator/history/${jobId}`);
  }
}
