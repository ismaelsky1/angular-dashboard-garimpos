import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {environment} from '../../environments/environment';
import {Router} from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  private currentTokenSubject: BehaviorSubject<string>;
  public currentToken: Observable<string>;
  public redirectUrl: string;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.currentTokenSubject = new BehaviorSubject<string>(localStorage.getItem('garimpos_token'));
    this.currentToken = this.currentTokenSubject.asObservable();
  }

  public getToken() {
    return this.currentTokenSubject.value;
  }

  public setToken(token) {
    localStorage.setItem('garimpos_token', token);
  }

  login(data) {
    return this.http.post<any>(`${environment.apiUrl}/login`, data).pipe(map(response => {
        this.setToken(response.accessToken);
        this.currentTokenSubject.next(response.accessToken);
        return response;
    }));
  }

  logout() {
    localStorage.removeItem('garimpos_token');
    this.currentTokenSubject.next(null);
    this.router.navigate(['login']);
  }
}
