import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Job, JobResponse, JobsResponse} from './job.model';
import {environment} from '../../../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(
    private http: HttpClient
  ) { }

  index(): Observable<Job[]> {
    return this.http.get<JobsResponse>(`${environment.apiUrl}/job`).pipe(
      map(response => response.data)
    );
  }

  show(id: string): Observable<Job> {
    return this.http.get<Job>(`${environment.apiUrl}/job/${id}`).pipe(
      map(response => response)
    );
  }

  showWithSteps(id: string): Observable<Job> {
    return this.http.get<Job>(`${environment.apiUrl}/job/${id}/steps`).pipe(
      map(response => response)
    );
  }

  store(job: Job): Observable<Job> {
    return this.http.post<Job>(`${environment.apiUrl}/job`, job).pipe(
      map(response => response)
    );
  }

  update(job: Job): Observable<Job> {
    return this.http.put<Job>(`${environment.apiUrl}/job/${job.id}`, job).pipe(
      map(response => response)
    );
  }
}
