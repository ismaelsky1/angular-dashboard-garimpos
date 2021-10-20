import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {City, CityResponse} from './city.model';
import {environment} from '../../../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(
    private http: HttpClient
  ) { }

  index(): Observable<City[]> {
    return this.http.get<CityResponse>(`${environment.apiUrl}/city`).pipe(
      map(response => response.data)
    );
  }

  show(id: string): Observable<City> {
    return this.http.get<City>(`${environment.apiUrl}/city/${id}`).pipe(
      map(response => response)
    );
  }

  store(city: City): Observable<City> {
    return this.http.post<City>(`${environment.apiUrl}/city`, city).pipe(
      map(response => response)
    );
  }

  update(city: City): Observable<City> {
    return this.http.put<City>(`${environment.apiUrl}/city/${city.id}`, city).pipe(
      map(response => response)
    );
  }

  delete(id: string) {
    return this.http.delete<City>(`${environment.apiUrl}/city/${id}`).pipe(
      map(response => response)
    );
  }
}
