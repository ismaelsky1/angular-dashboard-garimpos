import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  constructor(
    private http: HttpClient
  ) { }

  index(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/candidate`).pipe(
      map(response => response)
    );
  }

  show(id: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/candidate/${id}`).pipe(
      map(response => response)
    );
  }

  store(candidate: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/candidate`, candidate).pipe(
      map(response => response)
    );
  }

  update(candidate: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/candidate/${candidate.id}`, candidate).pipe(
      map(response => response)
    );
  }

  delete(id: string) {
    return this.http.delete<any>(`${environment.apiUrl}/candidate/${id}`).pipe(
      map(response => response)
    );
  }
}
