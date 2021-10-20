import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JobStepService {

  constructor(
    private http: HttpClient
  ) { }

  index(): Observable<JobStep[]> {
    return this.http.get<JobStepResponse>(`${environment.apiUrl}/jobstep`).pipe(
      map(response => response.data)
    );
  }

  show(id: string): Observable<JobStep> {
    return this.http.get<JobStep>(`${environment.apiUrl}/jobstep/${id}`).pipe(
      map(response => response)
    );
  }

  store(jobStep: JobStep) {
    return this.http.post<JobStepResponse>(`${environment.apiUrl}/jobstep`, jobStep).pipe(
      map(response => response)
    );
  }

  update(jobStep: JobStep) {
    return this.http.put<JobStepResponse>(`${environment.apiUrl}/jobstep/${jobStep.id}`, jobStep).pipe(
      map(response => response)
    );
  }

  delete(id: string) {
    return this.http.delete<JobStepResponse>(`${environment.apiUrl}/jobstep/${id}`).pipe(
      map(response => response)
    );
  }
}

export interface JobStep {
  id?: string;
  job_id?: string;
  sequence?: number;
  name?: string;

  job_step_candidate?: any[];
}

export interface JobStepResponse {
  data: JobStep[];
}
