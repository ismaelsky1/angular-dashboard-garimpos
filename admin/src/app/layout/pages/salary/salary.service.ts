import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {map} from 'rxjs/operators';
import {Salary, SalaryResponse} from "./salary.model";

@Injectable({
  providedIn: 'root'
})
export class SalaryService {

  constructor(
    private http: HttpClient
  ) { }

  index(): Observable<Salary[]> {
    return this.http.get<SalaryResponse>(`${environment.apiUrl}/salary`).pipe(
      map(response => response.data)
    );
  }

  show(id: string): Observable<Salary> {
    return this.http.get<Salary>(`${environment.apiUrl}/salary/${id}`).pipe(
      map(response => response)
    );
  }

  store(salary: Salary): Observable<Salary> {
    return this.http.post<Salary>(`${environment.apiUrl}/salary`, salary).pipe(
      map(response => response)
    );
  }

  update(salary: Salary): Observable<Salary> {
    return this.http.put<Salary>(`${environment.apiUrl}/salary/${salary.id}`, salary).pipe(
      map(response => response)
    );
  }

  delete(id: string) {
    return this.http.delete<Salary>(`${environment.apiUrl}/salary/${id}`).pipe(
      map(response => response)
    );
  }
}
