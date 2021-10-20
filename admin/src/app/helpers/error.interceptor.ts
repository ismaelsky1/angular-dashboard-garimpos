import {Injectable, Injector} from '@angular/core';
import {HttpClient, HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, switchMap} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {AuthenticationService} from '../services/authentication.service';
import {NzModalService} from 'ng-zorro-antd';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authenticationService: AuthenticationService,
    private injector: Injector,
    private modalService: NzModalService
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<HttpEventType.User>> {

    return next.handle(request).pipe(catchError(error => {

      if (error.status === 401 && error.error.message === 'TOKEN_EXPIRED') {

        const http = this.injector.get(HttpClient);

        return http.post<any>(`${environment.apiUrl}/refreshToken`, {}).pipe(switchMap(data => {

          this.authenticationService.setToken(data.accessToken);

          const cloneRequest = request.clone({
            setHeaders: {Authorization: `Bearer ${data.accessToken}`}
          });

          return next.handle(cloneRequest);
        }));
      }

      if (error.status === 401) {
        this.authenticationService.logout();
      }

      const errorMessage = error.error.message || error.statusText;
      const statusCodeAvailabled = [404, 405, 400];

      if (statusCodeAvailabled.indexOf(error.status) > -1) {

        let contents = '';

        for (const key in errorMessage) {
          const value = errorMessage[key];
          contents += `<li>${value}</li>`;
        }

        this.modalService.error({
          nzTitle: 'Ops, ocorreu um erro',
          nzContent: `<ul>${contents}</ul>`
        });
      }

      return throwError(errorMessage);

    }));
  }

}
