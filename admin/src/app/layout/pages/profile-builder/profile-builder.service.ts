import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ProfileBuilder, ProfileBuilderResponse, ProfileBuildersResponse} from './profile-builder.model';
import {environment} from '../../../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileBuilderService {

  constructor(
    private http: HttpClient
  ) { }

  index(): Observable<ProfileBuilder[]> {
    return this.http.get<ProfileBuildersResponse>(`${environment.apiUrl}/profilejob`).pipe(
      map(response => response.data)
    );
  }

  show(id: string): Observable<ProfileBuilder> {
    return this.http.get<ProfileBuilderResponse>(`${environment.apiUrl}/profilejob/${id}`).pipe(
      map(response => response.data)
    );
  }

  store(profileBuilder: ProfileBuilder): Observable<ProfileBuilder> {
    return this.http.post<ProfileBuilder>(`${environment.apiUrl}/profilejob`, profileBuilder).pipe(
      map(response => response)
    );
  }

  update(profileBuilder: ProfileBuilder): Observable<ProfileBuilder> {
    return this.http.put<ProfileBuilder>(`${environment.apiUrl}/profilejob/${profileBuilder.id}`, profileBuilder).pipe(
      map(response => response)
    );
  }

  delete(id: string) {
    return this.http.delete<ProfileBuilder>(`${environment.apiUrl}/profilejob/${id}`).pipe(
      map(response => response)
    );
  }
}
