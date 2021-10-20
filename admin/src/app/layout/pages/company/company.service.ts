import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Company, CompanyResponse} from './company.model';
import {environment} from "../../../../environments/environment";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(
    private http: HttpClient
  ) { }

  index(): Observable<Company[]> {
    return this.http.get<CompanyResponse>(`${environment.apiUrl}/company`).pipe(
      map(response => response.data)
    );
  }

  show(id: string): Observable<Company> {
    return this.http.get<Company>(`${environment.apiUrl}/company/${id}`).pipe(
      map(response => response)
    );
  }

  store(company: Company): Observable<Company> {
    return this.http.post<Company>(`${environment.apiUrl}/company`, company).pipe(
      map(response => response)
    );
  }

  update(company: Company): Observable<Company> {
    return this.http.put<Company>(`${environment.apiUrl}/company/${company.id}`, company).pipe(
      map(response => response)
    );
  }

  delete(id: string) {
    return this.http.delete<Company>(`${environment.apiUrl}/company/${id}`).pipe(
      map(response => response)
    );
  }
}
