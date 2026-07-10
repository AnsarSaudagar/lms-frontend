import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ProjectSummary } from '../models/project-summary.model';

@Injectable({
  providedIn: 'root',
})
export class CommonService {

  private http = inject(HttpClient);

    getDashboardProjectSummary(){
      return this.http.get<ProjectSummary>(`/me/dashboard`);
    }
}
