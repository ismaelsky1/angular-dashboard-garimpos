import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Reward} from './reward.model';
import {environment} from '../../../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RewardService {

  constructor(
    private http: HttpClient
  ) { }

  index(): Observable<Reward[]> {
    return this.http.get<Reward[]>(`${environment.apiUrl}/reward`).pipe(
      map(response => response)
    );
  }

  show(id: string): Observable<Reward> {
    return this.http.get<Reward>(`${environment.apiUrl}/reward/${id}`).pipe(
      map(response => response)
    );
  }

  store(reward: Reward): Observable<Reward> {
    return this.http.post<Reward>(`${environment.apiUrl}/reward`, reward).pipe(
      map(response => response)
    );
  }

  update(reward: Reward): Observable<Reward> {
    return this.http.put<Reward>(`${environment.apiUrl}/reward/${reward.id}`, reward).pipe(
      map(response => response)
    );
  }

  delete(id: string) {
    return this.http.delete<Reward>(`${environment.apiUrl}/reward/${id}`).pipe(
      map(response => response)
    );
  }
}
