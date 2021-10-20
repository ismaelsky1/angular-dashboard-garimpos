import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {State, StateResponse} from './state.model';
import {environment} from '../../../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor(
    private http: HttpClient
  ) { }

  index(): Observable<State[]> {
    return this.http.get<StateResponse>(`${environment.apiUrl}/state`).pipe(
      map(response => response.data)
    );
  }

  show(id: string): Observable<State> {
    return this.http.get<State>(`${environment.apiUrl}/state/${id}`).pipe(
      map(response => response)
    );
  }

  store(state: State): Observable<State> {
    return this.http.post<State>(`${environment.apiUrl}/state`, state).pipe(
      map(response => response)
    );
  }

  update(state: State): Observable<State> {
    return this.http.put<State>(`${environment.apiUrl}/state/${state.id}`, state).pipe(
      map(response => response)
    );
  }

  delete(id: string) {
    return this.http.delete<State>(`${environment.apiUrl}/state/${id}`).pipe(
      map(response => response)
    );
  }
}
