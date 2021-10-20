import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {map} from 'rxjs/operators';
import {WorkHour, WorkHourResponse} from "./work-hour.model";

@Injectable({
  providedIn: 'root'
})
export class WorkHourService {

  constructor(
    private http: HttpClient
  ) { }

  index(): Observable<WorkHour[]> {
    return this.http.get<WorkHourResponse>(`${environment.apiUrl}/workhour`).pipe(
      map(response => response.data)
    );
  }

  show(id: string): Observable<WorkHour> {
    return this.http.get<WorkHour>(`${environment.apiUrl}/workhour/${id}`).pipe(
      map(response => response)
    );
  }

  store(workHour: WorkHour): Observable<WorkHour> {
    return this.http.post<WorkHour>(`${environment.apiUrl}/workhour`, workHour).pipe(
      map(response => response)
    );
  }

  update(workHour: WorkHour): Observable<WorkHour> {
    return this.http.put<any>(`${environment.apiUrl}/workhour/${workHour.id}`, workHour).pipe(
      map(response => response)
    );
  }

  delete(id: string) {
    return this.http.delete<WorkHour>(`${environment.apiUrl}/workhour/${id}`).pipe(
      map(response => response)
    );
  }
}
