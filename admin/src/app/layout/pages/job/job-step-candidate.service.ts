import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JobStepCandidateService {


  constructor(
    private http: HttpClient
  ) { }

  index(): Observable<JobStepCandidate[]> {
    return this.http.get<JobStepCandidateResponse>(`${environment.apiUrl}/jobstepcandidate`).pipe(
      map(response => response.data)
    );
  }

  show(id: string): Observable<JobStepCandidate> {
    return this.http.get<JobStepCandidate>(`${environment.apiUrl}/jobstepcandidate/${id}`).pipe(
      map(response => response)
    );
  }

  store(jobStepCandidate: JobStepCandidate) {
    return this.http.post<JobStepCandidateResponse>(`${environment.apiUrl}/jobstepcandidate`, jobStepCandidate).pipe(
      map(response => response)
    );
  }

  update(jobStepCandidate: JobStepCandidate) {
    return this.http.put<JobStepCandidateResponse>(`${environment.apiUrl}/jobstepcandidate/${jobStepCandidate.id}`, jobStepCandidate).pipe(
      map(response => response)
    );
  }

  delete(id: string) {
    return this.http.delete<JobStepCandidateResponse>(`${environment.apiUrl}/jobstepcandidate/${id}`).pipe(
      map(response => response)
    );
  }
}

export interface JobStepCandidate {
  id?: string;
  candidate_id?: string;
  job_step_id?: string;
  check?: boolean;
}

export interface JobStepCandidateResponse {
  data: JobStepCandidate[];
}
