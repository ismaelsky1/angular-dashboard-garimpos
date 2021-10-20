import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Cbo, CboResponse} from './cbo.model';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CboService {

  constructor(
    private http: HttpClient
  ) { }

  index(): Observable<Cbo[]> {
    return this.http.get<CboResponse>(`${environment.apiUrl}/cbo`).pipe(
      map(response => response.data)
    );
  }

  show(id: string): Observable<Cbo> {
    return this.http.get<Cbo>(`${environment.apiUrl}/cbo/${id}`).pipe(
      map(response => response)
    );
  }

  store(cbo: Cbo): Observable<Cbo> {
    return this.http.post<Cbo>(`${environment.apiUrl}/cbo`, cbo).pipe(
      map(response => response)
    );
  }

  update(cbo: Cbo): Observable<Cbo> {
    return this.http.put<Cbo>(`${environment.apiUrl}/cbo/${cbo.id}`, cbo).pipe(
      map(response => response)
    );
  }

  delete(id: string) {
    return this.http.delete<Cbo>(`${environment.apiUrl}/cbo/${id}`).pipe(
      map(response => response)
    );
  }
}
